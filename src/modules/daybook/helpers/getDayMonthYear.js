const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const getDayMonthYear = (dateString) => {
    const date = new Date(dateString)

    return {
        day: date.getDate(),
        month: months[date.getMonth()],
        yearDay: `${date.getFullYear()}, ${days[date.getDay()]}`
    }
}

export default getDayMonthYear