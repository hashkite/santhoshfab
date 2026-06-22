import React from 'react';
import { getMultiData } from '../../../shared/api';
import { Sponsors, Partners, View } from '../../paragraphs';
import { useQueries } from 'react-query';

const SubService = ({ node_id }) => {
  const queries = useQueries([
    {
      queryKey: 'sponsors',
      queryFn: getMultiData('fetch/config_pages/our_clients'),
    },
    {
      queryKey: 'caseStudies',
      queryFn: getMultiData('fetch/config_pages/case_studies'),
    },
    {
      queryKey: 'partnersContent',
      queryFn: getMultiData('fetch/config_pages/partners'),
    },
    {
      queryKey: 'partners',
      queryFn: getMultiData(`search-by-partners/partners/block_1/${node_id}`),
    },
  ]);
  const isLoading = queries.some(query => query.isLoading);
  const [sponsors, caseStudies, partnersContent, partners] = queries.map(
    query => query.data
  );
  const { description, multicolor_title } = caseStudies?.data || {};
  const partnersContentData = partnersContent?.data || {};
  const { rows: partners_rows } = partners?.data || {};

  if (isLoading) return;

  return (
    <>
      {sponsors?.data?.images?.items?.[0] && (
        <div className="mt-xl">
          <Sponsors data={sponsors?.data?.images} />
        </div>
      )}
      <div className="view__case-studies">
        <View
          data={{
            description,
            multicolor_title,
            view: caseStudies?.data?.view,
          }}
        />
      </div>
      {partners_rows?.[0] && (
        <Partners items={partners_rows} {...partnersContentData} />
      )}
    </>
  );
};

export default SubService;
