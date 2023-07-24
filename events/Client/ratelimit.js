module.exports = async (client, data) => {
    client.logger.log(`RATELIMIT DETECTED\n
    Timeout for: ${data.timeout}\n
Limit: ${data.limit}\n
Methods: ${data.method}\n
Path: ${data.path}\n
Route: ${data.route}\n
Global: ${data.global}`
, "ratelimit");
    
}