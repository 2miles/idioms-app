import Swal from 'sweetalert2';

export const showSuccess = (title: string, text: string) =>
  Swal.fire({
    title,
    text,
    icon: 'success',
    timer: 1500,
    showConfirmButton: false,
  });

export const showError = (title: string, text: string) =>
  Swal.fire({
    title,
    text,
    icon: 'error',
  });

export const showConfirm = (title: string, text: string) =>
  Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    confirmButtonColor: '#DC3545',
    cancelButtonText: 'No, keep it',
  });
