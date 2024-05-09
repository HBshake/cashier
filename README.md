# How to compile
The system is a server-cleint architecture, and the two pieces of software have different instruction to build.

# Server
The easiest way to setup the server in a local machine is with the Docker configuration distributed with this package.

Instruction to install dowker on Windows can be found here: https://docs.docker.com/desktop/install/windows-install/

Once docker is installed, both the database, and server can be started with: `docker compose run --service-ports --build backend` from the root directory of the extracted source package.

To test whether the backend started correctly, a GET request can be made to http://localhost:8000/ and it should return "Cashier system Ready to Go!"

# Frontend
The frontend GUI reauires 2 dependencies with manual installation:

Rust: https://www.rust-lang.org/tools/install
NodeJS: https://nodejs.org/en

To check whether all the dependencies are installed, you can run `cargo --version` and `npm --version` respectively.

Once both packages are installed, the following command should be run from `/frontend`: `npm install` which will install automatically further dependencies

Finally, to build the application, run `npm run build` from `/frontend`. The executable output file should be under `/frontend/src-tauri/target/release/bundle`. This step will take a while to complete.

# Testing
If the docker configuration is used to generated the application, then the database will be filled with some testing data that can be used to test the application (`/database/10_seed.sql`).

Make sure that the server is running on the local machine(Step 1), then run the frontend executable (Step 2).
The application will prompt for printers to use, this screen can be skipped by pressing Next without specifying any printer. When prompted about an access key, `dev` can be used. Then select the 'Dev Account', and enter the password 'admin'. If everything goes correctly, you should land on the dashboard, and the UI is obvious enough from there on to not require textual instructions.
