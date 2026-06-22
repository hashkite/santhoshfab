import { useGSAP } from '@gsap/react';
import { Picture } from 'components/elements';
import { gsap } from 'gsap';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { HtmlField } from 'shared/ui';
import { Path } from './path';
import './style.scss';

const SomeCasesStudies = ({ data }) => {
  const { description, multicolor_title, case_studies } = data || {};

  const container = useRef(null);
  useGSAP(
    () => {
      if (
        document.querySelectorAll('.some_cases_studies--header h1').length > 0
      ) {
        gsap.from('.some_cases_studies--header h1', {
          scrollTrigger: {
            trigger: '.some_cases_studies--header h1',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (
        document.querySelectorAll('.some_cases_studies--description').length > 0
      ) {
        gsap.from('.some_cases_studies--description', {
          scrollTrigger: {
            trigger: '.some_cases_studies--description',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
        });
      }

      if (document.querySelectorAll('.some_cases_studies--grid').length > 0) {
        gsap.from('.some_cases_studies--grid', {
          scrollTrigger: {
            trigger: '.some_cases_studies--grid',
            once: true,
            start: 'top bottom',
            end: 'bottom center',
          },
          y: 50,
          opacity: 0,
          scale: 0.9,
        });
      }
    },
    { scope: container }
  );
  return (
    <section ref={container} className="some_cases_studies">
      <Path />
      <div className="container">
        {multicolor_title?.value && (
          <div className="some_cases_studies--header">
            <div dangerouslySetInnerHTML={{ __html: multicolor_title.value }} />
            {description?.value && (
              <div
                className="some_cases_studies--description"
                dangerouslySetInnerHTML={{ __html: description.value }}
              />
            )}
          </div>
        )}
        {case_studies?.items && (
          <div className="some_cases_studies--grid">
            {case_studies.items.map(({ image, title, url }, index) => (
              <NavLink
                to={url}
                className="some_cases_studies--item"
                key={index}
              >
                <Picture image={image?.items?.[0]} />

                <div className="some_cases_studies--item-content">
                  <HtmlField
                    text={title}
                    className="some_cases_studies--item-title"
                  />
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SomeCasesStudies;
