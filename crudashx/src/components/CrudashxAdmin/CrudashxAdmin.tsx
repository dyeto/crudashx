
import React, { useState } from "react";
import type { DashboardProps } from "../../types";
import { GlobalDataProvider } from "../../contexts/GlobalDataContext";

const CrudashxAdmin = ({ title, dataProvider, children }: DashboardProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const resources = React.Children.toArray(children);

    return (
        <GlobalDataProvider provider={dataProvider}>
            <div className="min-w-full bg-green-100 p-2 ">
            <div className="flex h-screen bg-gray-50 text-gray-800">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
                    <h1 className="text-2xl font-bold mb-6">{title}</h1>
                    <nav className="flex-1">
                        <ul className="space-y-2">
                            {resources.map((child: any, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => setActiveIndex(index)}
                                        className={`w-full text-left px-3 py-2 rounded-md transition ${index === activeIndex
                                                ? "bg-blue-500 text-white"
                                                : "hover:bg-gray-100"
                                            }`}
                                    >
                                        {child.props.title??child.props.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-6 overflow-auto">
                    {resources[activeIndex]}
                </main>
            </div>
            </div>
        </GlobalDataProvider>
    );
};


export default CrudashxAdmin