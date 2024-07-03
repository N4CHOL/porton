import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Function to show success toast
export const showSuccessToast = (message) => {
  toast.success(message);
};

// Function to show error toast
export const showErrorToast = (message) => {
  toast.error(message);
};

// Function to show warning toast
export const showWarningToast = (message) => {
  toast.warning(message);
};

// Function to show info toast
export const showInfoToast = (message) => {
  toast.info(message);
};
