Here’s the updated README with the backend repository link included:  

---

# 🚀 AI-Powered Test Automation Agent  

## 📌 Project Overview  
Modern software testing is time-consuming, costly, and often inefficient. Our AI-powered Test Automation Agent streamlines the testing process by analyzing Figma designs, generating structured test cases, automating script execution, and integrating seamlessly with CI/CD pipelines. This eliminates manual effort and accelerates software deployment.  

## 🎯 Key Features  
- **AI-Driven Test Case Generation:** Extracts functional and UI test cases from Figma designs.  
- **Automated Web Scraping:** Retrieves relevant HTML element IDs and classes.  
- **Selenium-Based Test Execution:** AI-generated scripts are executed automatically.  
- **Seamless CI/CD Integration:** Ensures continuous testing within the development pipeline.  
- **Optimized Performance:** Multi-threading and API load balancing for faster execution.  

## 🛠 Technology Stack  
- **Backend:** Python, Node.js  
- **Frontend:** React.js  
- **Automation Framework:** Selenium, Shell Scripting  
- **Database:** MongoDB  
- **CI/CD:** GitLab  
- **AI Model:** Google Gemini API  

## 🚧 Challenges & Solutions  
### *Challenges:*  
- Selenium scripts are not universally adaptable to all websites.  
- Error detection in system testing varies across different web applications.  
- API rate limits slow down test case generation.  
- Test case accuracy needs continuous improvement.  

### *Solutions:*  
- **Optimized AI models** to improve test case generation accuracy.  
- **Implemented web scraping techniques** to fetch relevant UI elements dynamically.  
- **Multi-threading & multiple API keys** to handle API rate limits effectively.  
- **Adaptive error detection mechanisms** for robust testing on different websites.  

## 🔄 Workflow  
1. **Extract Requirements:** Analyze Figma designs to determine UI-based test scenarios.  
2. **Generate Test Cases:** AI converts requirements into structured JSON test cases.  
3. **Web Scraping:** Fetch relevant HTML element IDs and classes for execution.  
4. **AI-Powered Script Generation:** AI generates Selenium scripts for test execution.  
5. **Automated Execution:** The scripts run within a CI/CD pipeline for continuous testing.  
6. **Result Logging:** The output is stored in a structured JSON format.  

## 📌 CI/CD Integration  
- The entire process runs within GitLab CI/CD pipelines using YAML configuration files.  
- Automated triggers ensure testing upon each commit or pull request.  
- Results are stored for future reference and debugging.  

## 📈 Impact  
✅ **Instant Code Testing** – Developers can validate code instantly.  
✅ **Faster Deployments** – Reduces the time required to push changes to production.  
✅ **Reduced Testing Costs** – Eliminates the need for manual testers.  
✅ **Improved Accuracy** – AI-generated test cases enhance reliability.  

## 📂 Installation & Setup  
1. **Clone the repository:**  
   ```sh
   git clone https://github.com/your-repo-name.git  
   cd your-repo-name  
   ```  
2. **Install dependencies:**  
   ```sh
   pip install -r requirements.txt  # For Python  
   npm install  # For Node.js frontend  
   ```  
3. **Run the Backend:**  
   ```sh
   python app.py  
   ```  
4. **Start the Frontend:**  
   ```sh
   npm start  
   ```  
5. **Run Tests:**  
   ```sh
   pytest tests/  
   ```  

## 🔗 Backend Repository  
The backend source code is available at:  
🔗 [AI-Powered Test Automation Backend](https://github.com/raj-mistry-01/HackNuThon-6-Team-Incognito)  

## 📜 License  
This project is licensed under the MIT License.  


