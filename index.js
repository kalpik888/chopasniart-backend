const app = require('./app');

// 1. FOR GOOGLE CLOUD FUNCTIONS
// We export the app so Google can handle the request.
// 'api' is the name we will use in the deploy command.
exports.api = app;

// 2. FOR LOCAL DEVELOPMENT (Your Computer)
// This check ensures we only 'listen' if we run this file directly (node index.js)
// Google Cloud imports the file, so this part won't run there.
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running locally on port ${PORT}`);
    });
}