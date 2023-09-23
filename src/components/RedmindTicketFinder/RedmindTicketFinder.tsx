const RedmindTicketFinder = (ticketNumbers: number[]) => {
    const ticketNumberForUrl = ticketNumbers.join(',')
    const baseUrl = "https://redmine.precs.jp/"
    const expandUrl = baseUrl + 'projects/precs-dev1/issues.json?f[]=issue_id&op[issue_id]==&v[issue_id][]='+ ticketNumberForUrl + '&c[]=all_inline&encoding=UTF-8'
    const header = {""}



}

export default RedmindTicketFinder
