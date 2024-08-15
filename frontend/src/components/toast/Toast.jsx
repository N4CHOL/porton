import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import "./toast.css"
// Function to show success toast
export const showSuccessToast = (message) => {
  toast.success(
    <FormattedMessage id={message} />,
    {
      className: 'custom-toast', // Apply your custom class
    }
  );
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
