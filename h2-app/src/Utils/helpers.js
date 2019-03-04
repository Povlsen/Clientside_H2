export function getDateString(date) {
    if (date === undefined) return date
    
    if (typeof date === 'string') 
        date = new Date(date)
        
    date.setDate(date.getDate() + 1)
    return date.toISOString().substring(0, 10)
}

export function getYesterday(date = new Date()) {
    date.setDate(date.getDate() - 1)
    return date.toISOString().substring(0, 10)
}