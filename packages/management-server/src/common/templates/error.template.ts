export class ErrorTemplate {
    static getNotFoundPage(): string {
        return `
            <html>
                <head>
                    <title>Error</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            background-color: #f5f5f5;
                        }
                        .container {
                            text-align: center;
                            padding: 20px;
                            background-color: white;
                            border-radius: 8px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        }
                        h1 { color: #dc3545; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Page Not Found</h1>
                        <p>The link you clicked appears to be broken or has expired.</p>
                    </div>
                </body>
            </html>
        `;
    }

    static getErrorPage(): string {
        return `
            <html>
                <head>
                    <title>Error</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            background-color: #f5f5f5;
                        }
                        .container {
                            text-align: center;
                            padding: 20px;
                            background-color: white;
                            border-radius: 8px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        }
                        h1 { color: #dc3545; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Error</h1>
                        <p>Something went wrong. Please try again later.</p>
                    </div>
                </body>
            </html>
        `;
    }

    static getMaintenancePage(): string {
        return `
            <html>
                <head>
                    <title>Maintenance</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            background-color: #f5f5f5;
                        }
                        .container {
                            text-align: center;
                            padding: 20px;
                            background-color: white;
                            border-radius: 8px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        }
                        h1 { color: #ffc107; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Under Maintenance</h1>
                        <p>The system is currently under maintenance. Please try again later.</p>
                    </div>
                </body>
            </html>
        `;
    }
}
