import React, { useEffect, useState } from 'react';
import { VerticalTabsBlock } from '../../elements';
import './relatedServices.scss';

import {
  getData,
  getNodeData,
  usedTransformedLocation,
} from '../../../shared/api';

const RealatedServices = ({ data }) => {
  const { multicolor_title } =
    data || '<h2>Related <span className="purple">Technologies</span></h2>';
  const pathname = usedTransformedLocation();
  const { data: node, isLoading } = getNodeData(pathname);
  const { node_id, service } = node?.data || {};
  const { data: relatedItems, isLoading: viewLoading } =
    service?.value && node_id
      ? getData(
        `search-by-tag/current_sub_services/current/${service?.value}/${node_id}`
      )
      : {};

  const [ randomRelatedItems, setRandomRelatedItems ] = useState([]);

  useEffect(() => {
    if (relatedItems?.data?.rows) {
      const shuffledRows = relatedItems.data.rows
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
      setRandomRelatedItems(shuffledRows);
    }
  }, [ relatedItems ]);

  if (isLoading || viewLoading || randomRelatedItems?.length === 0) return;

  return (
    <section className="related-services__block">
      <div className="container">
        <div className="row">
          <div className="col-xl-10 offset-xl-1">
            <div className="related-services">
              <div
                className="text-center mb-md"
                dangerouslySetInnerHTML={ {
                  __html: multicolor_title?.value || multicolor_title,
                } }
              />
              { relatedItems?.data?.rows && (
                <VerticalTabsBlock
                  related={ true }
                  randomItems={ randomRelatedItems }
                  items={ relatedItems.data.rows }
                />
              ) }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealatedServices;
