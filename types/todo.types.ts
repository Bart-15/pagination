export type TTodo = {
    userId: number
    id:number
    name: string
    title: string
    completed: boolean
};

export type TTodoQuery = {
    limit: string
    page: string
    q: string
}
