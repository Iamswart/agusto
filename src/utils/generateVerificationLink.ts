import jwt from 'jsonwebtoken';
import config from '../config/config';
import { client } from "../utils/redis";


export async function generateVerificationLink(userId: string): Promise<string> {
  const verificationToken = jwt.sign({ userId }, config.jwtSecret as string, { expiresIn: '1h' });
  
  const encodedToken = Buffer.from(verificationToken).toString('base64');
  
  const redisKey = `email_verification_${userId}`;
  await client.set(redisKey, encodedToken, 'EX', 3600);

  const verificationLink = `${config.frontendUrl}/profile/verify-email?token=${encodedToken}`;
  return verificationLink;
}


export async function generatePasswordResetLink(userId: string): Promise<string> {
    const resetToken = jwt.sign({ userId }, config.jwtSecret as string, { expiresIn: '15m' });
    const encodedToken = Buffer.from(resetToken).toString('base64');
    
    const redisKey = `password_reset_${userId}`;
    await client.set(redisKey, encodedToken, 'EX', 900); 
  
    const resetLink = `${config.frontendUrl}/reset-password?token=${encodedToken}`;
    return resetLink;
}
