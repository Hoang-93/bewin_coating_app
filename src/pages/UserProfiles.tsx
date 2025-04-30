import UserInfoCard from '../components/userprofile/UserInfoCard';
import UserMetaCard from "../components/userprofile/UsermetaCard";

export default function UserProfiles() {
  return (
    <>
      <div className="bg-white border border-gray-300 rounded-2xl p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 ">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div>
          <UserMetaCard />
          <UserInfoCard />
        </div>
      </div>
    </>
  );
}
