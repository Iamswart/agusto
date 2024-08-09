const emailTemplates = {
  welcome: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Comforter&family=Open+Sans:wght@300&family=Quintessential&family=Anton&family=Secular+One&display=swap"
            &display=swap" rel="stylesheet">
        <link href="http://fonts.cdnfonts.com/css/circular-std" rel="stylesheet">
        <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,500;0,600;1,200;1,500&display=swap"
            rel="stylesheet">
    </head>
    
    <body style="background-color: #F2F6F7; padding: 30px;">
        <div id="email" style="width:670px;margin: auto;background:white;">
    
            <!-- Header -->
            <table role="presentation" border="0" width="100%" cellspacing="0">
                <tr>
                    <td bgcolor="#f8f8f8" align="left" style="color: white;">
                        <img src="https://res.cloudinary.com/dfscst5lw/image/upload/v1723185938/AGUSTO_muwutt.png"
                            style="object-fit: contain" alt="" width="100%">
                    </td>
                </tr>
            </table>
            <!-- Body 1 -->
            <table role="presentation" align="center" border="0" width="500px" cellspacing="0">
                <tr>
                    <td style=" padding: 30px;" align="justify">
                        <h2 style="font-size: 19px; margin:0 0 24px 0; font-family:Avenir, 'Circular Std', 'Secular One';">
                        Hi {{name}},
                        Welcome to Augusto & Co Task Management, your gateway to organizing and optimizing your workflow efficiently.</h2>
                        <p style="margin:0 0 0 0;font-size:14px;line-height:24px;font-family:Avenir, 'Circular Std',
                            'Secular One'; font-weight: 400;" align="justify">
                            Now that you have taken the first step, we are excited to see what else you do. Getting settled
                            on Agusto is pretty easy. <br><br>
                        </p>
                    </td>
                </tr>
            </table>
    
            <!-- Body 1 -->
            <table role="presentation" align="center" border="0" width="600px" cellspacing="0">
                <tr>
                    <td style="padding: 0px 70px 0px 70px;" align="justify">
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Avenir, 'Circular Std', 'Secular One'; font-weight: 600;">
                            Your Friend,
                        </p>
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Avenir, 'Circular Std',
                            'Secular One'; font-weight: 500; color: #E25A5A">
                            Abdurrazaq <br>
                        </p>
                    </td>
                </tr>
            </table>
    
            <table role="presentation" border="0" width="100%" cellspacing="0"
                style="border-bottom: 1px solid #e1eaed; margin-bottom:30px">
                <tr>
                    <td style=" padding: 60px 65px 30px 65px;" align="justify">
                        <p style="margin:35px 0 0 0;font-size:14px;line-height:24px;font-family:Avenir, 'Circular Std',
                            'Secular One'; font-weight: 400; color: #A7B8BF">
                            If you did not take this action, please contact us immediately at <a
                                href="mailto:support@agusto.ng"
                                style="text-decoration: none; font-weight: bold; color: #253342;  font-family:Avenir, 'Circular Std', 'Secular One';">support@agusto.ng</a>
                        </p>
                    </td>
                </tr>
            </table>
    
            <!-- Body 3 -->
            
    
            <!-- Footer -->
            <table role="presentation" align="center" border="0" width="500px" cellspacing="0">
                <tr>
                    <td bgcolor="transparent" style="padding: 0px 30px 10px 30px;">
                        <p style="margin:0 0 12px 0; font-size:14px; line-height:24px; color: #000; font-family:Avenir,
                            'Circular Std', 'Secular One'; text-align:center; color: #8d999d">
                            ©2024 Agusto. All Rights Reserved</p>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    
    </html>
      `,
  forgotPassword: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Comforter&family=Open+Sans:wght@300&family=Quintessential&family=Anton&family=Secular+One&display=swap"
            &display=swap" rel="stylesheet">
        <link href="http://fonts.cdnfonts.com/css/circular-std" rel="stylesheet">
        <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,500;0,600;1,200;1,500&display=swap"
            rel="stylesheet">
    </head>
    
    <body style="background-color: #F2F6F7; padding: 30px">
        <div id="email" style="width:670px; margin: auto;background:white;">
    
            <!-- Header -->
            <table role="presentation" border="0" width="100%" cellspacing="0">
                <tr>
                    <td bgcolor="#f8f8f8" align="left" style="color: white;">
                        <img src="https://res.cloudinary.com/dfscst5lw/image/upload/v1723185938/AGUSTO_muwutt.png"
                            style="object-fit: contain" alt="" width="100%">
                    </td>
                </tr>
            </table>
            <!-- Body 1 -->
            <table role="presentation" border="0" width="500px" cellspacing="0" align="center"
                style="border-bottom: 1px solid #e1eaed; margin-bottom:30px">
                <tr>
                    <td style=" padding: 30px;" align="justify">
                        <p style="margin:0 0 0px 0;font-size:14px;line-height:24px;font-family:Avenir, 'Circular Std',
                            'Secular One'; font-weight: 400;" align="justify">
                            Hi {{name}}, <br><br>
                            We have received a password reset from your account. <br> If you did not put in this request,
                            kindly
                            ignore this email. <br> If you did, please click the button below to reset your password.
                        </p>
                        <br><br>
                        <table align="center" role="presentation" border="0" width="100%" cellspacing="0">
                            <tr>
                                <td align="center">
                                    <a href="{{token}}" style="background-color: #E25A5A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-family:Avenir, 'Circular Std', 'Secular One'; font-weight: 800; font-size: 18px;">Reset Password</a>
                                </td>
                         </tr>
                        </table>
                        <br><br>
                        <p style="margin:0 0 20px 0;font-size:14px;line-height:24px;font-family:Avenir, 'Circular Std',
                            'Secular One'; font-weight: 400;" align="justify">
                            Please note that this link will expire in 15 minutes. <br><br>
                            Remember, your password is personal and should not be disclosed to anyone.
                        </p>
    
    
                        <p style="margin:0px 0 0 0;font-size:14px;line-height:24px;font-family:Avenir, 'Circular Std',
                            'Secular One'; font-weight: 400; color: #A7B8BF">
                            If you did not take this action, please contact us immediately at <a
                                href="mailto:support@agusto.ng"
                                style="text-decoration: none; font-weight: bold; color: #253342;  font-family:Avenir, 'Circular Std', 'Secular One';">support@agusto.ng</a>
                        </p>
                    </td>
                </tr>
            </table>
    
            <!-- Body 3 -->
            
    
            <!-- Footer -->
            <table role="presentation" align="center" border="0" width="500px" cellspacing="0">
                <tr>
                    <td bgcolor="transparent" style="padding: 0px 30px 10px 30px;">
                        <p style="margin:0 0 12px 0; font-size:14px; line-height:24px; color: #000; font-family:Avenir,
                            'Circular Std', 'Secular One'; text-align:center; color: #8d999d">
                            ©2024 Agusto. All Rights Reserved</p>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    
    </html>`,
  verifiedEmailSuccess: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Comforter&family=Open+Sans:wght@300&family=Quintessential&family=Anton&family=Secular+One&display=swap"
            &display=swap" rel="stylesheet">
        <link href="http://fonts.cdnfonts.com/css/circular-std" rel="stylesheet">
        <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,500;0,600;1,200;1,500&display=swap"
            rel="stylesheet">
    </head>
    
    <body style="background-color: #F2F6F7; padding: 30px;">
        <div id="email" style="width:670px;margin: auto;background:white;">
    
            <!-- Header -->
            <table role="presentation" border="0" width="100%" cellspacing="0">
                <tr>
                    <td bgcolor="#f8f8f8" align="left" style="color: white;">
                        <img src="https://res.cloudinary.com/dfscst5lw/image/upload/v1723185938/AGUSTO_muwutt.png"
                            style="object-fit: contain" alt="" width="100%">
                    </td>
                </tr>
            </table>
            <!-- Body 1 -->
            <table role="presentation" align="center" border="0" width="500px" cellspacing="0"
                style="border-bottom: 1px solid #e1eaed; margin-bottom:30px">
                <tr>
                    <td style=" padding: 60px 65px 30px 65px;" align="justify">
                        <p style="margin:0 0 40px 0;font-size:14px;line-height:24px;font-family:Avenir, 'Circular Std',
                            'Secular One'; font-weight: 400;" align="justify">
                            Hey, <br><br>
                            Your email address has been verified! We're excited to have you officially join Agusto.<br>
                            With your email confirmed, you're all set to dive into a world of streamlined task management and collaboration. Whether you're looking to organize your tasks, track your progress, or connect with your team, our platform is designed to help you work efficiently and effectively. Let's get productive and stay on top of your goals! <br><br>
                            And if you ever need any assistance or have a question, our customer support team is here for you 24/7. Just hit us up
                            at <a href="mailto:support@agusto.ng" style="text-decoration: none; font-weight: bold; color: #253342; font-family:Avenir,
                                'Circular Std', 'Secular One';">support@agusto.ng</a> and we'll get you sorted.
                            <br><br>
                            Team at Agusto
                        </p>
                    </td>
                </tr>
            </table>
    
            <!-- Body 3 -->
            
    
            <!-- Footer -->
            <table role="presentation" align="center" border="0" width="500px" cellspacing="0">
                <tr>
                    <td bgcolor="transparent" style="padding: 0px 30px 10px 30px;">
                        <p style="margin:0 0 12px 0; font-size:14px; line-height:24px; color: #000; font-family:Avenir,
                            'Circular Std', 'Secular One'; text-align:center; color: #8d999d">
                            ©2024 Agusto. All Rights Reserved</p>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    
    </html>`,

  changePasswordSuccess: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Comforter&family=Open+Sans:wght@300&family=Quintessential&family=Anton&family=Secular+One&display=swap"
            &display=swap" rel="stylesheet">
        <link href="http://fonts.cdnfonts.com/css/circular-std" rel="stylesheet">
        <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,500;0,600;1,200;1,500&display=swap"
            rel="stylesheet">
    </head>
    
    <body style="background-color: #F2F6F7; padding: 30px;">
        <div id="email" style="width:670px; margin: auto;background:white;">
    
            <!-- Header -->
            <table role="presentation" border="0" width="100%" cellspacing="0">
                <tr>
                    <td bgcolor="#f8f8f8" align="left" style="color: white;">
                        <img src="https://res.cloudinary.com/dfscst5lw/image/upload/v1723185938/AGUSTO_muwutt.png"
                            style="object-fit: contain" alt="" width="100%">
                    </td>
                </tr>
            </table>
            <!-- Body 1 -->
            <table role="presentation" border="0" width="500px" cellspacing="0" align="center"
                style="border-bottom: 1px solid #e1eaed; margin-bottom:30px">
                <tr>
                    <td style=" padding: 60px 65px 30px 65px;" align="justify">
                        <p style="margin:0 0 40px 0;font-size:14px;line-height:24px;font-family:Avenir, 'Circular Std',
                            'Secular One'; font-weight: 400;" align="justify">
                            This is a confirmation mail that the password for your Agusto account has been changed. If you did
                            this, we are all set. <br><br>
                            Remember, your password is personal and should not be disclosed to
                            anyone.<br><br>
                            Team at Agusto
                        </p>
                        <p style="margin:0px 0 0 0;font-size:14px;line-height:24px;font-family:Avenir, 'Circular Std',
                            'Secular One'; font-weight: 400; color: #A7B8BF">
                            If you did not take this action, please contact us immediately at <a
                                href="mailto:support@agusto.ng"
                                style="text-decoration: none; font-weight: bold; color: #253342;  font-family:Avenir, 'Circular Std', 'Secular One';">support@agusto.ng</a>
                        </p>
                    </td>
                </tr>
            </table>
    
            <!-- Body 3 -->
            
    
            <!-- Footer -->
            <table role="presentation" align="center" border="0" width="500px" cellspacing="0">
                <tr>
                    <td bgcolor="transparent" style="padding: 0px 30px 10px 30px;">
                        <p style="margin:0 0 12px 0; font-size:14px; line-height:24px; color: #000; font-family:Avenir,
                            'Circular Std', 'Secular One'; text-align:center; color: #8d999d">
                            ©2024 Agusto. All Rights Reserved</p>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    
    </html>`,

  confirmEmail: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Comforter&family=Open+Sans:wght@300&family=Quintessential&family=Anton&family=Secular+One&display=swap"
            &display=swap" rel="stylesheet">
        <link href="http://fonts.cdnfonts.com/css/circular-std" rel="stylesheet">
        <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,500;0,600;1,200;1,500&display=swap"
            rel="stylesheet">
    </head>
    
    <body style="background-color: #F2F6F7; padding: 30px;">
        <div id="email" style="width:670px;margin: auto;background:white;">
    
            <!-- Header -->
            <table role="presentation" border="0" width="100%" cellspacing="0">
                <tr>
                    <td bgcolor="#f8f8f8" align="left" style="color: white;">
                        <img src="https://res.cloudinary.com/dfscst5lw/image/upload/v1723185938/AGUSTO_muwutt.png"
                            style="object-fit: contain" alt="" width="100%">
                    </td>
                </tr>
            </table>
            <!-- Body 1 -->
            <table role="presentation" align="center" border="0" width="500px" cellspacing="0"
                style="border-bottom: 1px solid #e1eaed; margin-bottom:30px">
                <tr>
                    <td style=" padding: 60px 65px 30px 65px;" align="justify">
                    Dear {{name}}, <br><br>
                        <!-- <h2 style="font-size: 19px; margin:0 0 24px 0; font-family:Avenir, 'Circular Std', 'Secular One';">
                            Don't worry, it's a quick and painless process! </h2> -->
                        <p style="margin:0 0 40px 0;font-size:14px;line-height:24px;font-family:Avenir, 'Circular Std',
                            'Secular One'; font-weight: 400;" align="justify">
                            Don't worry, it's a quick and painless process!
                            <br><br>
                            Why do we need to verify your information ?
                            <br><br>
                            Well, we want to make sure your account is secure and that you receive all of our important
                            updates, news, and offers.
                            <br><br>
                            Confirm that this is the email address you want as your Agusto email address with the link
                            below.
                            <br><br>
                            <table align="center" role="presentation" border="0" width="100%" cellspacing="0">
                            <tr>
                                <td align="center">
                                    <a href="{{token}}" style="display: inline-block; background-color: #E25A5A; border-radius: 14px; outline: none; border: none; width: 300px; height: 64px; font-size:14px; color: #fff; text-align: center; line-height: 64px; text-decoration: none;">Confirm Email</a>
                                </td>
                            </tr>
                            </table>
                            <br><br>
                            P.S. If you have any questions or concerns, feel free to send us an email via the support page.
                            We're always here to help!
                            <br><br>
                            Team at Agusto
                        </p>
    
    
                        <p style="margin:35px 0 0 0;font-size:14px;line-height:24px;font-family:Avenir, 'Circular Std',
                            'Secular One'; font-weight: 400; color: #A7B8BF">
                            If you did not take this action, please contact us immediately at <a
                                href="mailto:support@agusto.ng"
                                style="text-decoration: none; font-weight: bold; color: #253342;  font-family:Avenir, 'Circular Std', 'Secular One';">support@agusto.ng</a>
                        </p>
                    </td>
                </tr>
            </table>
    
            <!-- Body 3 -->
            
    
            <!-- Footer -->
            <table role="presentation" align="center" border="0" width="500px" cellspacing="0">
                <tr>
                    <td bgcolor="transparent" style="padding: 0px 30px 10px 30px;">
                        <p style="margin:0 0 12px 0; font-size:14px; line-height:24px; color: #000; font-family:Avenir,
                            'Circular Std', 'Secular One'; text-align:center; color: #8d999d">
                            ©2023 Agusto. All Rights Reserved</p>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    
    </html>`,
};

export default emailTemplates;
