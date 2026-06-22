// animate title and then each grid element
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
const useHirePopupAnimation = ref =>
  useGSAP(
    () => {
      const title = ref.current?.querySelector('.title');
      const blocks = ref.current?.querySelectorAll('.tile__block');

      if (title) {
        gsap
          .timeline()
          .from(ref.current?.querySelectorAll('.title'), {
            opacity: 0,
            y: 10,
            delay: 0.2,
            duration: 0.3,
            ease: 'power2.inOut',
          })
          .from(ref.current?.querySelectorAll('.tile__block'), {
            opacity: 0,
            y: 10,
            stagger: 0.1,
            duration: 0.4,
            ease: 'power2.inOut',
          });
      } else {
        gsap.timeline().from(ref.current?.querySelectorAll('.tile__block'), {
          opacity: 0,
          y: 10,
          stagger: 0.1,
          duration: 0.4,
          delay: 0.2,
          ease: 'power2.inOut',
        });
      }
    },
    { scope: ref }
  );

export default useHirePopupAnimation;
