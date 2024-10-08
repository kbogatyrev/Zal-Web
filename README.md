Build the NodeJS server for Linux using Visual Studio 2022 (C++ core) and Visual Studio Code (NodeJS add-on and JavaScript components)
to build a Linux binary.

1. Build the core component on a Windows 10/11 platform with WSL targeting Linux   
-- Clone the Zal-Core repo from the GitHub: https://github.com/kbogatyrev/Zal-Core into a Windows folder   
-- Open the Zal-Core directory as a CMake project   
-- Select **WSL:Ubuntu-...** connection as the target system and "Linux Debug" or "Linux Release" as the current configuration   
-- Build the Linux Binary   

3. Build the Node C++ add-on (Visual Studio Code)   
-- Open an WSL Ubuntu connection   
-- Clone the Zal-Web repo from the GitHub: https://github.com/kbogatyrev/Zal-Web targeting a WSL Linux directory   
-- Use VSC to open the Zal-Web directory as a CMake project or --   
-- Open a WSL Ubuntu window and cd to Zal-Web   
-- Say **cmake-js** to build the NodeJS server   
-- Edit the appropriate .toml file   
-- Start the server by entering **node index.js zal-web_local.toml**   
