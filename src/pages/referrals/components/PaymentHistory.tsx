import { Box, Text, Spacer, Table, EmptyState } from '@flexisaf/flexibull2';
import Skeleton from 'react-loading-skeleton';
import { useEffect } from 'react';
import { getLocalUser } from 'utils/helpers';
import Theme from 'utils/theme';
import useReferrals from '../hooks/useReferrals';
import { thousandFormatter } from 'utils/helpers';
import StatusTag from 'components/statusTag/statusTag';
import moment from 'moment';

const PaymentHistory = () => {
  const user = getLocalUser();
  const userId = user?.id as string;
  const { paymentHistory, isLoadingPaymentHistory, getPaymentHistory } =
    useReferrals(userId);

  useEffect(() => {
    if (!userId) return;
    getPaymentHistory(userId);
  }, []);
  return (
    <>
      <Box>
        <Spacer space={30} />
        <Text bold size="1rem" color={Theme.PrimaryTextColor}>
          Payment History
        </Text>
        <Spacer space={10} />
        <Text size="1rem" color={Theme.PrimaryTextColor}>
          You can view a list of all referrals paid to you.
        </Text>
        <Box>
          {isLoadingPaymentHistory ? (
            <>
              <Spacer space={14} />
              <Skeleton
                count={1}
                baseColor="#d0d5d933"
                highlightColor="#c2cad133"
                width="100%"
                height="30rem"
              />
            </>
          ) : paymentHistory?.length ? (
            <Table>
              <table>
                <thead>
                  <tr>
                    <th>S/No</th>
                    <th>Date</th>
                    <th>Amount </th>
                    <th>Status </th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment, index) => (
                    <tr key={payment.id}>
                      <td>{index + 1}</td>
                      <td>
                        {' '}
                        {moment(payment.approvedAt).format('DD, MMMM  YYYY')}
                      </td>
                      <td>{thousandFormatter(payment.amount ?? 0)}</td>
                      <td>
                        <StatusTag
                          status={payment.approved ? 'PAID' : 'FAILED'}
                        >
                          {payment.approved ? 'PAID' : 'FAILED'}
                        </StatusTag>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Table>
          ) : (
            <Box align="center">
              <EmptyState
                title="No Payment Found"
                info="It seems like you have no payment history"
                style={{ width: '100%' }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default PaymentHistory;
