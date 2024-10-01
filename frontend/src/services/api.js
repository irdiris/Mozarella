
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // API endpoint

// Admin endpoints
export const fetchDepartments = () => axios.get(`${API_BASE_URL}/Departments`);
export const fetchManagers = () => axios.get(`${API_BASE_URL}/Managers`);
export const addManager = (managerData) => axios.post(`${API_BASE_URL}/addManager`, managerData);
export const addDepartment = (departmentData) => axios.post(`${API_BASE_URL}/addDepartment`, departmentData);
export const updateDepartment = (departmentData) => axios.post(`${API_BASE_URL}/updateDepartment`, departmentData);
export const updateManager = (managerData) => axios.post(`${API_BASE_URL}/updateManager`, managerData);
export const deleteManager = (managerData) => axios.post(`${API_BASE_URL}/deleteManager`, managerData);
export const deleteDepartment = (departmentData) => axios.post(`${API_BASE_URL}/deleteDepartment`, departmentData);

// Manager endpoints
export const fetchTasks = () => axios.get(`${API_BASE_URL}/Tasks`);
export const fetchEmployees = () => axios.get(`${API_BASE_URL}/Employees`);
export const addEmployee = (employeeData) => axios.post(`${API_BASE_URL}/addEmployee`, employeeData);
export const addTask = (taskData) => axios.post(`${API_BASE_URL}/addTask`, taskData);
export const updateEmployee = (employeeData) => axios.post(`${API_BASE_URL}/updateEmployee`, employeeData);
export const updateTask = (taskData) => axios.post(`${API_BASE_URL}/updateTask`, taskData);
export const deleteTask = (taskData) => axios.post(`${API_BASE_URL}/deleteTask`, taskData);
export const deleteEmployee = (employeeData) => axios.post(`${API_BASE_URL}/deleteEmployee`, employeeData);

// Announcement endpoints
export const fetchAnnouncements = () => axios.get(`${API_BASE_URL}/Announcements`);
export const createAnnouncement = (announcementData) => axios.post(`${API_BASE_URL}/addAnnouncement`, announcementData);
export const updateAnnouncement = (announcementData) => axios.post(`${API_BASE_URL}/updateAnnouncement`, announcementData);
export const deleteAnnouncement = (announcementData) => axios.post(`${API_BASE_URL}/deleteAnnouncement`, announcementData);


// New functions for employee feedback and work history
export const submitFeedback = (employeeId, feedbackData) => axios.post(`${API_BASE_URL}/employees/${employeeId}/feedback`, { feedback: feedbackData });
export const fetchEmployeeWorkHistory = (employeeId) => axios.get(`${API_BASE_URL}/employees/${employeeId}/work-history`);

// New functions for group management
export const fetchGroups = () => axios.get(`${API_BASE_URL}/groups`);
export const addGroup = (groupData) => axios.post(`${API_BASE_URL}/groups`, groupData);
export const updateGroup = (groupData) => axios.put(`${API_BASE_URL}/groups/${groupData.id}`, groupData);
export const deleteGroup = (groupId) => axios.delete(`${API_BASE_URL}/groups/${groupId}`);
export const fetchGroupEmployees = (groupId) => axios.get(`${API_BASE_URL}/groups/${groupId}/employees`);

// New API functions for Account.js
export const fetchEmployeeAccount = () => axios.get(`${API_BASE_URL}/employees/account`);
export const updateEmployeeAccount = (accountData) => axios.put(`${API_BASE_URL}/employees/account`, accountData);
export const logout = () => axios.post(`${API_BASE_URL}/logout`);

// New API functions for Feedback.js
export const fetchEmployeeFeedbacks = () => axios.get(`${API_BASE_URL}/employees/feedbacks`);

// New API functions for WorkHistory.js
export const fetchEmployeeCompletedTasks = () => axios.get(`${API_BASE_URL}/employees/completed-tasks`);

// New API functions for WorkTodo.js
export const fetchEmployeeTasks = () => axios.get(`${API_BASE_URL}/employees/tasks`);
export const submitWork = (taskId, submission) => axios.post(`${API_BASE_URL}/employees/tasks/${taskId}/submit`, { submission });

