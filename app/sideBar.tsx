export default function navBar() {
    return (
         <div className="fixed top-0 left-0 w-full h-16 flex flex-row items-center bg-white  text-black shadow-md px-4 z-50">
            <span className="mr-4"> {/*margin right, new to tailwind*/}
                <img src="itesm.png"  width={32} height={32} />
            </span>
        </div>
    );
}


