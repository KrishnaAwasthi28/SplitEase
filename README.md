<h1 align="center">📘 SplitEase – Smart Expense Splitter App</h1>

<p>
  SplitEase is a full-stack expense tracking and splitting application designed 
  to simplify group expenses for trips, meals, or shared activities. It automates 
  share calculation, manages user-specific expenses securely, and generates 
  WhatsApp-ready summaries for participants.
</p>

<hr/>

<h2>🚀 Features</h2>

<h3>✔️ User Authentication</h3>
<ul>
  <li>Secure JWT-based login & registration</li>
  <li>Password hashing with BCrypt</li>
  <li>User-specific access control</li>
</ul>

<h3>✔️ Expense Management</h3>
<ul>
  <li>Create expenses with title, notes, amount, date, and participants</li>
  <li>Automatic equal split calculation</li>
  <li>Sends formatted WhatsApp summary messages</li>
  <li>View all expenses created by logged-in user</li>
  <li>Delete expenses individually</li>
</ul>

<h3>✔️ Modern UI/UX</h3>
<ul>
  <li>React-based clean interface</li>
  <li>Soft, minimal gradient background</li>
  <li>Responsive expense cards</li>
</ul>

<h3>✔️ Performance</h3>
<ul>
  <li>Optimized Spring Boot backend</li>
  <li>Fast and stable response time even under load</li>
</ul>

<hr/>

<h2>🛠️ Tech Stack</h2>

<h3>Frontend</h3>
<ul>
  <li>React.js</li>
  <li>React Router</li>
  <li>TailwindCSS (or custom styling)</li>
</ul>

<h3>Backend</h3>
<ul>
  <li>Java 21</li>
  <li>Spring Boot</li>
  <li>Spring Security + JWT</li>
  <li>Hibernate + JPA</li>
  <li>MySQL</li>
</ul>

<h3>Deployment</h3>
<ul>
  <li>Backend: Render / Railway using Docker</li>
  <li>Frontend: Vercel / Netlify</li>
  <li>Database: Railway MySQL</li>
</ul>

<hr/>

<h2>📁 Project Structure</h2>

<pre>
SplitEase/
│── backend/
│   ├── src/main/java/com/... 
│   ├── Dockerfile
│   └── application.properties
│
│── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
</pre>

<hr/>

<h2>⚙️ Setup Instructions</h2>

<h3>1. Clone the Repository</h3>
<pre>
git clone https://github.com/your-username/splitease.git
cd splitease
</pre>

<h3>2. Backend Setup</h3>
<p>Create a database:</p>
<pre>
CREATE DATABASE splitease;
</pre>

<p>Configure <code>application.properties</code>:</p>
<pre>
spring.datasource.url=jdbc:mysql://localhost:3306/splitease
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
</pre>

<p>Run backend:</p>
<pre>
cd backend
mvn spring-boot:run
</pre>

<h3>3. Frontend Setup</h3>
<pre>
cd frontend
npm install
npm run dev
</pre>

<hr/>

<h2>🔌 API Endpoints</h2>

<h3>Authentication</h3>
<table>
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>POST</td><td>/api/auth/register</td><td>Register user</td></tr>
<tr><td>POST</td><td>/api/auth/login</td><td>Login & get JWT</td></tr>
</table>

<h3>Expenses</h3>
<table>
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>POST</td><td>/api/expenses/create</td><td>Create new expense</td></tr>
<tr><td>GET</td><td>/api/expenses/user/{email}</td><td>Get expenses for user</td></tr>
<tr><td>DELETE</td><td>/api/expenses/delete/{id}</td><td>Delete an expense</td></tr>
</table>

<hr/>

<h2>🐳 Docker Deployment (Backend)</h2>

<h4>Build Image</h4>
<pre>
docker build -t splitease-backend .
</pre>

<h4>Run Container</h4>
<pre>
docker run -p 8080:8080 splitease-backend
</pre>

<hr/>

<h2>📊 Performance Summary</h2>
<p>
  The backend showed strong performance with fast response times and efficient 
  throughput under concurrent load, ensuring smooth scalability for real users.
</p>

<hr/>

<h2>🤝 Contributing</h2>
<p>
  Contributions, feature requests, and suggestions are welcome!  
  Feel free to open an issue or submit a pull request.
</p>

<hr/>

<h2>⭐ Support</h2>
<p>
  If you like this project, please give it a ⭐ on GitHub!
</p>
