import React from "react";

const DashBoardPage = () => {
  const tableItems = [
    {
      avatar:
        "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
      name: "Ajay maurya",
      email: "ajay@gmail.com",
      score: "85",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/79.jpg",
      name: "rajesh maurya",
      email: "ajay@gmail.com",
      score: "75",
    },
    {
      avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      name: "hansal mehta",
      email: "ajay@gmail.com",
      score: "95",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/86.jpg",
      name: "pranav patil",
      email: "ajay@gmail.com",
      score: "45",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Students
          </h3>
          <p className="text-gray-600 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <a
            href="javascript:void(0)"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add Students
          </a>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Student name</th>
              <th className="py-3 px-6">Student Email</th>
              <th className="py-3 px-6">Overall Points</th>
              <th className="py-3 mr-5 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 bg-white divide-y">
            {tableItems.map((item, idx) => (
              <tr key={idx}>
                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                  <img src={item.avatar} className="w-10 h-10 rounded-full" />
                  <div>{item.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.email}
                </td>
                <td className="px-6 mr-14 flex justify-center items-center py-4 whitespace-nowrap">{item.score}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap">{item.salary}</td> */}
                <td className="px-6 whitespace-nowrap">
                  <a
                    href="javascript:void()"
                    className="py-2 px-3 font-semibold text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 bg-blue-100 p-2 rounded-lg "
                  >
                    View Profile
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashBoardPage;
