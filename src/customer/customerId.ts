import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

/**
 * Validates that a provided customer id is present, else generates a unique UUID for the customer
 * @param customerId - The ID value provided by the platform. Pass `''` if none is available.
 * @param emailAddress - an email address, if any is available. Pass `''` if none is available.
 * @returns either (a) the original customer Id, if set or (b) a unique UUID based on the email address or (c) a random, unique UUID
 */
export const getUniqueCustomerId = (customerId: string, emailAddress: string): string => {
  let id = customerId;
  // If we don't yet have a customer's id, generate one
  if (!id) {
    if (emailAddress) {
      // If we have an email, use the v5 namespace hash
      id = uuidv5(emailAddress.toLowerCase().trim(), uuidv5.URL);
    } else {
      // Otherwise, generate a random uuid according to v4
      id = uuidv4();
    }
  }
  return id;
};
