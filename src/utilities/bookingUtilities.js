import Swal from "sweetalert2";

// use local storage to manage bookings data where each mechanic is allowed to get maximum 4 bookings every day
// const addToBookings = id =>{
//     const bookings = JSON.parse(localStorage.getItem('bookings'));
//     if(bookings){
//         const mechanic = bookings.find(mechanic => mechanic.id === id);
//         if(mechanic){
//             const mechanicBookings = mechanic.bookings;
//             const mechanicBookingsCount = mechanicBookings.length;
//             const mechanicBookingsCountPerDay = mechanicBookings.filter(booking => booking.date === new Date().toLocaleDateString()).length;
//             if(mechanicBookingsCountPerDay < 4){
//                 mechanicBookings.push({
//                     date: new Date().toLocaleDateString(),
//                     time: new Date().toLocaleTimeString()
//                 });
//                 localStorage.setItem('bookings', JSON.stringify(bookings));
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Oops...',
//                     text: 'You have reached the maximum number of bookings per day',
//                 });
//             }
//         } else {
//             bookings.push({
//                 id: id,
//                 bookings: [{
//                     date: new Date().toLocaleDateString(),
//                     time: new Date().toLocaleTimeString()
//                 }]

//             });
//             localStorage.setItem('bookings', JSON.stringify(bookings));
//         }
//     } else {
//         localStorage.setItem('bookings', JSON.stringify([{
//             id: id,
//             bookings: [{
//                 date: new Date().toLocaleDateString(),
//                 time: new Date().toLocaleTimeString()
//             }]
//         }]));
//     }
// }

const addToBookings = (mechanic) =>{
    const bookings = JSON.parse(localStorage.getItem('bookings'));
    if(bookings){
        if(bookings.includes(mechanic)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You have already booked this Mechanic!',
            });
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Already Booked a Mechanic!',
                text: 'If you want to book another mechanic then first remove the currently booked mechanic from Bookings',
            });
        }
    } else {
        localStorage.setItem('bookings', JSON.stringify(mechanic));
        Swal.fire({
            icon: 'success',
            title: 'Booking Success!',
            text: 'You have successfully booked this mechanic!',
        });
    }
}

const getStoredBookings = () =>{
    let bookings = {};

    //get the shopping cart from local storage
    const storedBookings = localStorage.getItem('bookings');
    if(storedBookings){
        bookings = JSON.parse(storedBookings);
    }
    return bookings;
}

const removeFromDb = id =>{
    const storedBookings = localStorage.getItem('bookings');
    if(storedBookings){
        const bookings = JSON.parse(storedBookings);
        if(id in bookings){
            delete bookings[id];
            localStorage.setItem('bookings', JSON.stringify(bookings));
        }
        Swal.fire(
            'Mechanic Removed!',
            'You have removed this Mechanic!',
            'info'
          )
    }
      setTimeout(() => window.location.reload(), 1000);
}

const deleteBookings = () =>{
    localStorage.removeItem('bookings');
    window.location.reload();
}

export {
    addToBookings,
    getStoredBookings,
    removeFromDb,
    deleteBookings
}