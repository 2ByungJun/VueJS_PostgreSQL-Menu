import Vue from 'vue'

// toastAlert
const swalToastAlert = (options) => {
    const Toast = Vue.swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Vue.swal.stopTimer)
        toast.addEventListener('mouseleave', Vue.swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: options.icon || 'success',
        title: options.title || '성공하였습니다.'
    })
}

const swalConfirm = async (options) => {
    return Vue.swal({
        title: '정말로 삭제하시겠습니까?' || options.title,
        text: '삭제된 항목은 복구되지 않습니다.' || options.text,
        icon: 'warning' || options.icon,
        confirmButtonText: '삭제' || options.confirmButtonText,
        cancelButtonText: '취소' || options.cancelButtonText,
        showCancelButton: true,
        showCloseButton: true,
        showLoaderOnConfirm: true
    })
}

export {
    swalToastAlert,
    swalConfirm,
}