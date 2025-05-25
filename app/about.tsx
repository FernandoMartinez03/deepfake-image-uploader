export default function About() { {/* inspo de https://pagedone.io/blocks/marketing/about-us-section*/}
    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
                
                <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
                    <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                    <img
                        className="rounded-xl object-cover"
                        src="womanRight1.jpeg"
                        alt="about Us image"
                    />
                    </div>
                    <img
                    className="sm:ml-0 ml-auto rounded-xl object-cover"
                    src="womanLeft.jpg" 
                    alt="about Us image"
                    />
                </div>

                <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                    <div className="w-full flex-col justify-center items-start gap-8 flex">
                    <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                        <h2 className="text-gray-900 text-4xl font-bold leading-normal lg:text-start text-center">
                        About
                        </h2>
                        <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>

                    <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                        <div className="flex-col justify-start items-start inline-flex">
                        <h3 className="text-gray-900 text-4xl font-bold leading-normal">Reliable</h3>
                        <h6 className="text-gray-500 text-base font-normal leading-relaxed">Consistent accuracy across real-world scenarios</h6>
                        </div>
                        <div className="flex-col justify-start items-start inline-flex">
                        <h4 className="text-gray-900 text-4xl font-bold leading-normal">Relevant</h4>
                        <h6 className="text-gray-500 text-base font-normal leading-relaxed">Trained on current threats</h6>
                        </div>
                        <div className="flex-col justify-start items-start inline-flex">
                        <h4 className="text-gray-900 text-4xl font-bold leading-normal">Robust</h4>
                        <h6 className="text-gray-500 text-base font-normal leading-relaxed">Engineered to handle the unexpected</h6>
                        </div>
                    </div>
                    </div>

                    <a href="https://github.com/FernandoMartinez03/DeepFakeDetecionPaper" target="_blank" rel="noopener noreferrer">
                        <button className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                            <span className="px-1.5 text-white text-sm font-medium leading-6">Read More</span>
                        </button>
                    </a>

                </div>
                </div>
            </div>
            </section>

    );
}
