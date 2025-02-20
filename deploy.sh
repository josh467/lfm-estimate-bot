#!/bin/bash

# Build the React app
echo "Building React app..."
npm run build

# Compress the build folder
echo "Compressing build folder..."
zip -r build.zip build

# Upload to Hostinger via FTP
echo "Uploading to Hostinger..."
ftp -n <<EOF
open ftp.yourdomain.com
user your_ftp_username your_ftp_password
cd public_html
put build.zip
quit
EOF

# SSH into the server and extract the files
echo "Extracting files on server..."
ssh user@yourdomain.com <<EOF
cd public_html
unzip -o build.zip
rm build.zip
EOF

echo "Deployment complete!"
    
    This script does the following: 
    
    Builds the React app using  npm run build . 
    Compresses the build folder into a ZIP file. 
    Uploads the ZIP file to the server using FTP. 
    SSH into the server and extracts the files. 
    
    You can run this script by executing  bash deploy.sh  in your terminal. 
    Conclusion 
    In this tutorial, you learned how to deploy a React app to a shared hosting server. You can use FTP to upload the files to the server and SSH to extract the files. 
    If you’re looking for a more automated deployment process, you can use CI/CD tools like Jenkins, CircleCI, or GitHub Actions. 
    I hope this tutorial was helpful to you. If you have any questions or suggestions, feel free to leave a comment below. 
    Share this: Twitter Twitter Reddit Reddit LinkedIn LinkedIn Facebook Facebook 
    Subscribe to our newsletter! 
    Our latest tutorials delivered straight to your inbox 
    
                        
                        Sign up for all newsletters.
                    
                    
                                    
                        By signing up, you agree to our  Privacy Policy and European users agree to the data transfer policy. We will not share your data and you can unsubscribe at any time. 
                    
                    
    
    
    How to Show Lunar/Moon Phases in Google Calendar 
    14 of the Best Discord Servers to Join (And Where You