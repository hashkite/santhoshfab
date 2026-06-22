import React, { useState, useEffect, useRef } from 'react';

import { Loading } from '../../../shared/ui';
import Post from './post';
import PostsFilters from './filters';
import { getSearchByParameters } from '../../../shared/api';
import Pager from './pager';

import './posts.scss';

const Posts = ({ view, items, type, paragraph_id, filters }) => {
  const { rows, form, view: viewIds, pager } = view || {};
  const [ params, setParams ] = useState({});
  const [ posts, setPosts ] = useState(rows || items);

  const postsRef = useRef();

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

  const { data: filteredData, isLoading } = filters ? getSearchByParameters({
    ...viewIds,
    paragraph_id,
    params
  }) : {};

  useEffect(() => {
    if (filteredData && filteredData?.data && filteredData.data?.rows) {
      setPosts(filteredData?.data?.rows);
    }
  }, [ filteredData, params ]);

  if (isLoading) return <Loading />;

  return (
    <div ref={ postsRef }>
      <div className="posts__wrapper">
        { form?.[ 0 ] && (
          <div className="posts__filter">
            <PostsFilters
              filters={ form?.[ 0 ] }
              params={ params }
              onSetParam={ onSetParam }
            />
          </div>
        ) }
        <div className={ `posts__grid${type ? ` --type-${type}` : ''}` }>
          { !posts && <Loading /> }
          { posts && posts.map(item => (
            <Post
              key={ item?.id }
              data={ item }
              type={ type }
            />
          )) }
        </div>
        { form?.[ 0 ] && pager && (
          <Pager
            data={ pager }
          />
        ) }
      </div>
    </div>
  );
};

export default Posts;