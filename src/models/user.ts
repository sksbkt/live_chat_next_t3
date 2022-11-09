export interface message {
    id: number,
    message: string,
    sender?: "admin" | string,
    dateSend?: string,
    dateReceived?: string,
}