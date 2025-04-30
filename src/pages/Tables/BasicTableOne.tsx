import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Trash2, Edit2, Download, Settings, X, Eye, EyeOff } from 'lucide-react';

// Define types
interface DataItem {
  id: number;
  user: string;
  email: string;
  position: string;
  salary: string;
  office: string;
  status: string;
  department: string;
  startDate: string;
  projects: number;
  performance: string;
}

interface SortConfig {
  key: string | null;
  direction: string | null;
}

interface VisibleColumns {
  user: boolean;
  position: boolean;
  salary: boolean;
  office: boolean;
  status: boolean;
  action: boolean;
  department: boolean;
  startDate: boolean;
  projects: boolean;
  performance: boolean;
}

const DataTable: React.FC = () => {
  // Dữ liệu mẫu
  const initialData: DataItem[] = [
    { id: 1, user: 'Lindsey Curtis', email: 'demoemail@gmail.com', position: 'Sales Assistant', salary: '$89,500', office: 'Edinburgh', status: 'Hired', department: 'Sales', startDate: '2023-05-15', projects: 4, performance: 'Good' },
    { id: 2, user: 'Kaiya George', email: 'demoemail@gmail.com', position: 'Chief Executive Officer', salary: '$105,000', office: 'London', status: 'In Progress', department: 'Executive', startDate: '2020-01-10', projects: 12, performance: 'Excellent' },
    { id: 3, user: 'Zain Geidt', email: 'demoemail@gmail.com', position: 'Junior Technical Author', salary: '$120,000', office: 'San Francisco', status: 'In Progress', department: 'Documentation', startDate: '2022-08-22', projects: 5, performance: 'Average' },
    { id: 4, user: 'Abram Schleifer', email: 'demoemail@gmail.com', position: 'Software Engineer', salary: '$95,000', office: 'New York', status: 'Hired', department: 'Engineering', startDate: '2021-11-03', projects: 8, performance: 'Good' },
    { id: 5, user: 'Carla George', email: 'demoemail@gmail.com', position: 'Integration Specialist', salary: '$80,000', office: 'Chicago', status: 'Pending', department: 'Engineering', startDate: '2023-02-18', projects: 3, performance: 'Average' },
    { id: 6, user: 'Thomas Johnson', email: 'demoemail@gmail.com', position: 'UX Designer', salary: '$92,000', office: 'London', status: 'Hired', department: 'Design', startDate: '2022-04-30', projects: 7, performance: 'Good' },
    { id: 7, user: 'Sarah Miller', email: 'demoemail@gmail.com', position: 'Data Analyst', salary: '$85,000', office: 'New York', status: 'Pending', department: 'Analytics', startDate: '2023-01-05', projects: 6, performance: 'Good' },
    { id: 8, user: 'Robert Chen', email: 'demoemail@gmail.com', position: 'Project Manager', salary: '$110,000', office: 'San Francisco', status: 'In Progress', department: 'Management', startDate: '2021-06-12', projects: 15, performance: 'Excellent' },
    { id: 9, user: 'Emily Wong', email: 'demoemail@gmail.com', position: 'Marketing Specialist', salary: '$78,000', office: 'Chicago', status: 'Hired', department: 'Marketing', startDate: '2022-09-20', projects: 5, performance: 'Good' },
    { id: 10, user: 'Michael Brown', email: 'demoemail@gmail.com', position: 'Frontend Developer', salary: '$98,000', office: 'Edinburgh', status: 'Pending', department: 'Engineering', startDate: '2022-07-14', projects: 9, performance: 'Excellent' },
  ];

  // State
  const [data, setData] = useState<DataItem[]>(initialData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });
  const [columnSettingsOpen, setColumnSettingsOpen] = useState<boolean>(false);
  const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>({
    user: true,
    position: true,
    salary: true,
    office: true,
    status: true,
    action: true,
    department: true,
    startDate: true,
    projects: true,
    performance: true // add new columns
  });
  
  const columnSettingsRef = useRef<HTMLDivElement | null>(null);

  // Xử lý tìm kiếm
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  };

  // Xử lý sắp xếp
  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Lọc và sắp xếp dữ liệu
  const filteredData = data.filter(item => {
    return Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key as keyof DataItem];
      const bValue = b[sortConfig.key as keyof DataItem];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Render trạng thái với màu sắc
  const renderStatus = (status: string) => {
    if (status === 'Hired') {
      return <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">Hired</span>;
    } else if (status === 'In Progress') {
      return <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs">In Progress</span>;
    } else if (status === 'Pending') {
      return <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs">Pending</span>;
    }
    return <span>{status}</span>;
  };
  
  // Lưu trạng thái cột hiển thị vào localStorage
  useEffect(() => {
    const savedColumns = localStorage.getItem('tableVisibleColumns');
    if (savedColumns) {
      setVisibleColumns(JSON.parse(savedColumns));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tableVisibleColumns', JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  // Sort indicator
  const getSortIcon = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
    }
    return <ChevronDown size={16} className="text-gray-400" />;
  };

  // Xử lý click outside để đóng dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (columnSettingsRef.current && !columnSettingsRef.current.contains(event.target as Node)) {
        setColumnSettingsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [columnSettingsRef]);

  // Toggle hiển thị cột
  const toggleColumn = (column: keyof VisibleColumns) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  return (
    <div className=" p-2 ">
      {/* <h2 className="text-2xl font-bold mb-6">Data Table 3</h2> */}
      
      <div className="bg-gray-800 rounded-lg overflow-hidden dark:text-white/90">
        {/* Header with controls */}
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="mr-2">Show</span>
            <select 
              className="bg-gray-700 border border-gray-600 rounded p-2 text-white"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <span className="ml-2">entries</span>
          </div>
          
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg w-64 text-white"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            {/* Column Settings Button */}
            <div className="relative ml-4" ref={columnSettingsRef}>
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center"
                onClick={() => setColumnSettingsOpen(!columnSettingsOpen)}
              >
                <Settings size={18} className="mr-2" />
                Columns
              </button>
              
              {columnSettingsOpen && (
                <div className="absolute right-0 mt-2 bg-gray-700 rounded-lg shadow-lg z-10 w-64 p-3">
                  <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-600">
                    <h3 className="font-medium">Visible Columns</h3>
                    <button 
                      className="text-gray-400 hover:text-white"
                      onClick={() => setColumnSettingsOpen(false)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {Object.keys(visibleColumns).map((column) => (
                      <div key={column} className="flex items-center justify-between py-1">
                        <span className="capitalize">{column.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <button 
                          className={`p-1 rounded ${visibleColumns[column as keyof VisibleColumns] ? 'text-green-400' : 'text-gray-400'}`}
                          onClick={() => toggleColumn(column as keyof VisibleColumns)}
                        >
                          {visibleColumns[column as keyof VisibleColumns] ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <button className="ml-4 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center">
              <Download size={18} className="mr-2" />
              Download
            </button>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-b border-gray-700">
                <th className="p-4">
                  <input type="checkbox" className="w-4 h-4" />
                </th>
                {visibleColumns.user && (
                  <th 
                    className="p-4 text-left cursor-pointer"
                    onClick={() => requestSort('user')}
                  >
                    <div className="flex items-center">
                      User
                      {getSortIcon('user')}
                    </div>
                  </th>
                )}
                {visibleColumns.position && (
                  <th 
                    className="p-4 text-left cursor-pointer"
                    onClick={() => requestSort('position')}
                  >
                    <div className="flex items-center">
                      Position
                      {getSortIcon('position')}
                    </div>
                  </th>
                )}
                {visibleColumns.salary && (
                  <th 
                    className="p-4 text-left cursor-pointer"
                    onClick={() => requestSort('salary')}
                  >
                    <div className="flex items-center">
                      Salary
                      {getSortIcon('salary')}
                    </div>
                  </th>
                )}
                {visibleColumns.office && (
                  <th 
                    className="p-4 text-left cursor-pointer"
                    onClick={() => requestSort('office')}
                  >
                    <div className="flex items-center">
                      Office
                      {getSortIcon('office')}
                    </div>
                  </th>
                )}
                {visibleColumns.department && (
                  <th 
                    className="p-4 text-left cursor-pointer"
                    onClick={() => requestSort('department')}
                  >
                    <div className="flex items-center">
                      Department
                      {getSortIcon('department')}
                    </div>
                  </th>
                )}
                {visibleColumns.startDate && (
                  <th 
                    className="p-4 text-left cursor-pointer"
                    onClick={() => requestSort('startDate')}
                  >
                    <div className="flex items-center">
                      Start Date
                      {getSortIcon('startDate')}
                    </div>
                  </th>
                )}
                {visibleColumns.projects && (
                  <th 
                    className="p-4 text-left cursor-pointer"
                    onClick={() => requestSort('projects')}
                  >
                    <div className="flex items-center">
                      Projects
                      {getSortIcon('projects')}
                    </div>
                  </th>
                )}
                {visibleColumns.performance && (
                  <th 
                    className="p-4 text-left cursor-pointer"
                    onClick={() => requestSort('performance')}
                  >
                    <div className="flex items-center">
                      Performance
                      {getSortIcon('performance')}
                    </div>
                  </th>
                )}
                {visibleColumns.status && (
                  <th 
                    className="p-4 text-left cursor-pointer"
                    onClick={() => requestSort('status')}
                  >
                    <div className="flex items-center">
                      Status
                      {getSortIcon('status')}
                    </div>
                  </th>
                )}
                {visibleColumns.action && (
                  <th className="p-4 text-left">Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-750">
                  <td className="p-4">
                    <input type="checkbox" className="w-4 h-4" />
                  </td>
                  {visibleColumns.user && (
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{item.user}</div>
                        <div className="text-gray-400 text-sm">{item.email}</div>
                      </div>
                    </td>
                  )}
                  {visibleColumns.position && (
                    <td className="p-4">{item.position}</td>
                  )}
                  {visibleColumns.salary && (
                    <td className="p-4">{item.salary}</td>
                  )}
                  {visibleColumns.office && (
                    <td className="p-4">{item.office}</td>
                  )}
                  {visibleColumns.department && (
                    <td className="p-4">{item.department}</td>
                  )}
                  {visibleColumns.startDate && (
                    <td className="p-4">{item.startDate}</td>
                  )}
                  {visibleColumns.projects && (
                    <td className="p-4">{item.projects}</td>
                  )}
                  {visibleColumns.performance && (
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.performance === 'Excellent' ? 'bg-green-600 text-white' :
                        item.performance === 'Good' ? 'bg-blue-600 text-white' :
                        'bg-yellow-600 text-white'
                      }`}>
                        {item.performance}
                      </span>
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td className="p-4">
                      {renderStatus(item.status)}
                    </td>
                  )}
                  {visibleColumns.action && (
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-200">
                          <Trash2 size={20} />
                        </button>
                        <button className="text-gray-400 hover:text-gray-200">
                          <Edit2 size={20} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 flex justify-between items-center">
          <div>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedData.length)} of {sortedData.length} entries
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-700 text-gray-400' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
              >
                {page}
              </button>
            ))}
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-700 text-gray-400' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;