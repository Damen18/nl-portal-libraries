import * as React from 'react';
import {FC, Fragment, ReactElement} from 'react';
import {StatusType, ZaakStatus} from '@nl-portal/api';
import {Paragraph, Step, Timeline} from '@gemeente-denhaag/denhaag-component-library';
import Skeleton from 'react-loading-skeleton';
import {useIntl} from 'react-intl';
import styles from './status-history.module.scss';
import {stringToId} from '../../utils';

interface StatusHistoryProps {
  caseId?: string;
  statusHistory?: Array<ZaakStatus>;
  statuses?: Array<StatusType>;
  loading: boolean;
  facet?: ReactElement;
  background?: ReactElement;
}

const StatusHistory: FC<StatusHistoryProps> = ({
  caseId,
  statusHistory,
  statuses,
  loading,
  facet,
  background,
}) => {
  const intl = useIntl();
  const amountOfStatuses = statusHistory?.length;
  const activeStep = amountOfStatuses ? amountOfStatuses - 1 : 0;

  const getSkeletonStep = (key: number) => (
    <div
      key={key}
      className={styles['skeleton-step']}
      aria-busy
      aria-disabled
      aria-label={intl.formatMessage({id: 'element.loading'})}
    >
      <div className={styles['skeleton-step__circle']}>
        <Skeleton circle height={20} width={20} />
      </div>
      <Paragraph>
        <Skeleton width={200} />
      </Paragraph>
    </div>
  );

  return (
    <div className={styles['status-history-container']}>
      {background && (
        <div className={styles['background-container']}>
          {React.cloneElement(background, {className: styles['background-image']})}
        </div>
      )}
      {facet && (
        <div className={styles['facet-container']}>
          {React.cloneElement(facet, {className: styles['facet-image']})}
        </div>
      )}
      <div className={styles['status-history']}>
        {!loading && statuses ? (
          <Timeline activeStep={activeStep} className={styles['status-history__timeline']}>
            {statuses?.map((status, index) => (
              <Step
                key={status.omschrijving}
                label={intl.formatMessage({
                  id: `case.${caseId}.status.${stringToId(`${status.omschrijving}`)}`,
                })}
                completed={index < activeStep}
              />
            ))}
          </Timeline>
        ) : (
          <Fragment>
            {getSkeletonStep(0)}
            {getSkeletonStep(1)}
          </Fragment>
        )}
      </div>
    </div>
  );
};
export {StatusHistory};
