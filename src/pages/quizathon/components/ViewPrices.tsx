import React from 'react';
import {
  Box,
  Grid,
  Text,
  Modal,
  ModalBody,
  ModalClose,
  Spacer,
} from '@flexisaf/flexibull2';
import { PriceCard, Card } from '../styles';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const ViewPrices = ({ isOpen, onClose }: IProps) => {
  return (
    <Modal onClose={onClose} open={isOpen}>
      <ModalBody style={{ maxWidth: '900px' }} width="90%" bgColor="#fff">
        <ModalClose onClick={onClose}>&times;</ModalClose>
        <Box pad="3.5rem 1rem">
          <Text bold size="1.2rem" block>
            Prizes to be won
          </Text>
          <Spacer space="8" />
          <Text color="#8E8E93" block size="1rem">
            Below are prizes to be won by various participants
          </Text>
          <Spacer space="15" />
          <PriceCard>
            <Spacer space="10" />
            <h2 className="title"> Top 3 students</h2>
            <Spacer space="10" />
            <Box background="#F6F6F9" pad="0.7rem">
              <Grid default="repeat(3,1fr)" md="repeat(2,1fr)" sm="1fr">
                {TopThreeStudents.map((top) => (
                  <Card>
                    <Box className="position">
                      <Box>
                        <i
                          className={top.icon}
                          style={{ fontSize: '1.3rem' }}
                        />
                      </Box>
                      <h3 className="position-text">{top.position}</h3>
                    </Box>
                    <Spacer space="20" />
                    <h4 className="amount-won">Amount to be won</h4>
                    <Spacer space="10" />
                    <Text bold size="1rem">
                      {top.amount}
                    </Text>
                  </Card>
                ))}
              </Grid>
            </Box>
          </PriceCard>
          <Spacer space="30" />
          <PriceCard>
            <Spacer space="10" />
            <h2 className="title"> Top 100 students</h2>
            <Spacer space="10" />
            <Box background="#F6F6F9" pad="0.7rem">
              <Grid default="repeat(3,1fr)" md="repeat(2,1fr)" sm="1fr">
                {TopHundredStudents.map((top) => (
                  <Card>
                    <Box className="position">
                      <Box>
                        <i
                          className={top.icon}
                          style={{ fontSize: '1.3rem' }}
                        />
                      </Box>
                      <h3 className="position-text">{top.position}</h3>
                    </Box>
                    <Spacer space="20" />
                    <h4 className="amount-won">Amount to be won</h4>
                    <Spacer space="10" />
                    <Text bold size="1rem">
                      {top.amount}
                    </Text>
                  </Card>
                ))}
              </Grid>
            </Box>
          </PriceCard>
          <Spacer space="30" />
          <Grid default="1fr 1fr" md="1fr 1fr" sm="1fr" gap="1rem">
            <PriceCard>
              <Spacer space="10" />
              <h2 className="title">Participating school/ department</h2>
              <Spacer space="10" />
              <Box background="#F6F6F9" pad="0.7rem">
                <Card>
                  <Box className="position">
                    <Box>
                      <i
                        className="saf-medal-star"
                        style={{ fontSize: '1.3rem' }}
                      />
                    </Box>
                    <h3 className="position-text">Top 3 performing school</h3>
                  </Box>
                  <Spacer space="20" />
                  <h4 className="amount-won">Amount to be won</h4>
                  <Spacer space="10" />
                  <Text bold size="1rem">
                    Five Hundred Thousand Naira
                  </Text>
                </Card>
              </Box>
            </PriceCard>
            <PriceCard>
              <Spacer space="10" />
              <h2 className="title">Incentives for participation</h2>
              <Spacer space="10" />
              <Box background="#F6F6F9" pad="0.7rem">
                <Card>
                  <Box className="position">
                    <Box>
                      <i
                        className="saf-medal-star"
                        style={{ fontSize: '1.3rem' }}
                      />
                    </Box>
                  </Box>
                  <Spacer space="20" />
                  <h4 className="amount-won">Amount to be won</h4>
                  <Spacer space="10" />
                  <Text bold size="1rem">
                    Tech gadgets, educational resources
                  </Text>
                </Card>
              </Box>
            </PriceCard>
          </Grid>
        </Box>
      </ModalBody>
    </Modal>
  );
};

export default ViewPrices;

const TopThreeStudents = [
  {
    icon: 'saf-profile-add',
    position: 'First Place',
    amount: 'One Million Naira',
  },
  {
    icon: 'saf-profile-add',
    position: 'Second Place',
    amount: 'Seven Hundred Thousand Naira ',
  },
  {
    icon: 'saf-profile-add',
    position: 'Third Place',
    amount: 'Five Hundred Thousand Naira ',
  },
];

const TopHundredStudents = [
  {
    icon: 'saf-people',
    position: 'Ranks 4-10',
    amount: 'One Hundred Thousand Naira Each',
  },
  {
    icon: 'saf-people',
    position: 'Ranks 11-50',
    amount: 'Fifty Thousand Naira Each',
  },
  {
    icon: 'saf-people',
    position: 'Ranks 51-100',
    amount: 'Twenty-five Thousand Naira Each',
  },
];
