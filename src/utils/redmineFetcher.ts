export type Redmine = {
    issue: {
        subject: string
        description: string
        done_ratio: number
    }
}
const redmineFetcher = async (issueId: number) => {
    const baseUrl = import.meta.env.VITE_REDMINE_BASE_URL
    const url = baseUrl + `/issues/${String(issueId)}.json`
    const response = await fetch(url, {
        headers: {
            'X-Redmine-API-Key': import.meta.env.VITE_REDMINE_API_SECOND_KEY,
        },
    })

    if (!response) {
        throw new Error('Response is not found.')
    }

    if (!response.ok) {
        throw new Error('Request failed')
    }

    const data = await response.json()
    return data as Redmine
}

export default redmineFetcher
