# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

Install and Configure Nginx:

Install Nginx:

bash
Copy code
sudo apt-get install nginx
Copy the build folder to Nginx’s default web directory:

bash
Copy code
sudo cp -r build/* /var/www/html/
Restart Nginx:

bash
Copy code
sudo systemctl restart nginx
Your app should now be accessible via the EC2 public IP.

Step 2: Use S3 for Image Storage
Create an S3 bucket:

Go to Amazon S3 console.
Create a bucket (e.g., manhwa-images).
Upload Images to the bucket.

Serve Images from S3:

Use the public URLs of the images in your JSON data (if you plan to display images in the app).
3. Auto-Scaling Setup
AWS EC2 Auto Scaling:
Create an Auto Scaling Group:
Go to the EC2 Auto Scaling console.
Define the minimum and maximum number of EC2 instances based on traffic.
Configure Scaling Policies:
Set policies to scale based on CPU utilization or network traffic.
For example, scale up when CPU utilization > 70%, and scale down when < 20%.
4. Security Setup
a) Enable HTTPS:
Use AWS Certificate Manager (ACM) to get an SSL certificate:

Go to ACM and request a new certificate for your domain.
Attach the certificate to an Elastic Load Balancer (if you have one) or configure Nginx to serve via HTTPS.

b) Configure Firewall:
In the EC2 Security Groups, allow only necessary ports:
Port 80 for HTTP
Port 443 for HTTPS
Restrict SSH (port 22) to your IP.
