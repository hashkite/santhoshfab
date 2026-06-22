import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import { Loading } from '../../../shared/ui';
import { getSearchByParameters } from '../../../shared/api';
import TeamFilter from './filter';
import TeamItem from './item';
import { Button } from '../';
import { Icon } from '../svg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './teamGrid.scss';

const TeamGrid = ({ paragraph_id, view }) => {
  const { rows, form, view: viewIds } = view || {};
  const [ params, setParams ] = useState({});
  const [ teamData, setTeamData ] = useState(rows);
  const swiperNavPrev = useRef(null);
  const swiperNavNext = useRef(null);
  const swiperPagination = useRef(null);

  const onSetParam = (e, paramName, paramId) => {
    e.preventDefault();

    if (paramId) {
      setParams(prev => {
        return { ...prev, [ paramName ]: paramId };
      });
    } else {
      setParams(prev => {
        const newObj = { ...prev };
        delete newObj[ paramName ];

        return newObj;
      });
    }
  };

  const { data: filteredData, isLoading } =
    viewIds && paragraph_id
      ? getSearchByParameters({
        ...viewIds,
        paragraph_id,
        params,
      })
      : {};

  useEffect(() => {
    if (filteredData && filteredData?.data && filteredData.data?.rows) {
      setTeamData(filteredData?.data?.rows);
    }
  }, [ filteredData, params ]);

  if (isLoading) return <Loading />;

  return (
    <div className="team-grid__wrapper">
      { form?.[ 0 ] && (
        <div className="team-grid__filter">
          <TeamFilter
            filters={ form[ 0 ] }
            params={ params }
            onSetParam={ onSetParam }
          />
        </div>
      ) }
      <div className="team-grid__swiper-wrapper">
        <Swiper
          modules={ [ Navigation, Pagination ] }
          slidesPerView={ 1 }
          spaceBetween={ 35 }
          loop={ false }
          navigation={ {
            prevEl: swiperNavPrev.current,
            nextEl: swiperNavNext.current,
          } }
          pagination={ {
            el: swiperPagination.current,
            clickable: true,
          } }
          breakpoints={ {
            550: {
              spaceBetween: 25,
              slidesPerView: 2,
            },
            1024: {
              spaceBetween: 25,
              slidesPerView: 3,
            },
            1440: {
              spaceBetween: 25,
              slidesPerView: 4,
            },
          } }
          onSwiper={ swiper => {
            setTimeout(() => {
              swiper.params.navigation.prevEl = swiperNavPrev.current;
              swiper.params.navigation.nextEl = swiperNavNext.current;
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();

              swiper.params.pagination.el = swiperPagination.current;
              swiper.pagination.destroy();
              swiper.pagination.init();
              swiper.pagination.render();
              swiper.pagination.update();
            });
          } }
        >
          { teamData?.map((item, index) => (
            <SwiperSlide key={ index }>
              <TeamItem data={ item } />
            </SwiperSlide>
          )) }
          <SwiperSlide>
            <TeamItem last />
          </SwiperSlide>
        </Swiper>
        <div className="posts-carousel__controls">
          <div ref={ swiperNavPrev }>
            <Button className="btn btn-square btn-gray-border">
              <Icon
                className="icon--turn-left"
                icon="angle--right"
                color="white"
                height="10px"
                width="16px"
              />
              <span className="visually-hidden">{ 'Swipe left' }</span>
            </Button>
          </div>
          <div className="posts-carousel__pagination" ref={ swiperPagination } />
          <div ref={ swiperNavNext }>
            <Button className="btn btn-square btn-gray-border">
              <Icon
                icon="angle--right"
                color="white"
                height="10px"
                width="16px"
              />
              <span className="visually-hidden">{ 'Swipe right' }</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamGrid;
