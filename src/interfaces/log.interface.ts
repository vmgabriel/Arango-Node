
/**
 * Type of Log
 */
export interface ILogData {
  action: string;
  userId?: number;
  targetElement: string;
  originAgent: string;
  originIp: string;
  data?: any;
}
