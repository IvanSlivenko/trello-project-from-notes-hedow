export function ExampleMenu (){
    return (
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {["Home", "About", "Services", "Pricing", "Contact"].map(
              (item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className={`block py-2 px-3 rounded-sm ${
                      item === "Home"
                        ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    } md:p-0`}
                    aria-current={item === "Home" ? "page" : undefined}
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div> 
    )
} 