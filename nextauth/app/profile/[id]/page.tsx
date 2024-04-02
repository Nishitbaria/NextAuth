import { getUserById } from "@/lib/action/user.action";

export default async function UserProfile({ params }: any) {
  const user = await getUserById(params.id);
  console.log(user, "data printing from user profile");

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
            {/* Placeholder for profile picture, replace with actual <img> tag */}
            <svg
              className="w-full h-full text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-3.007A11.996 11.996 0 0112 12a11.996 11.996 0 0112 8.993zM12 0a5.506 5.506 0 015.5 5.5A5.506 5.506 0 0112 11a5.506 5.506 0 01-5.5-5.5A5.506 5.506 0 0112 0z" />
            </svg>
          </div>
          <p className="mt-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Profile Page
          </p>
          <span className="mt-2 p-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold shadow">
            ID: {user?._id}
          </span>
          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {user?.username}
          </h2>
          <h3 className="text-md text-gray-600">{user?.email}</h3>
        </div>
      </div>
    </div>
  );
}
