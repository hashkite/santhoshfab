import ErrorBoundary from '../../../shared/ui/error-boundary';
import {
  AboutUsCards,
  AllServices,
  BusinessNeeds,
  ContactWays,
  Creativity,
  DevelopmentTeam,
  FamaashProductions,
  FamaashStreamlines,
  Faq,
  FeaturedCaseStudies,
  GetInTouchWithUs,
  Grid,
  Hero,
  HeroPlus,
  HorizontalScroll,
  HorizontalTabs,
  HowWeWork,
  Locations,
  OurCapabilities,
  OurExpertise,
  OurFootprints,
  OurModel,
  OurTeam,
  OurValues,
  PeopleTabs,
  Pricing,
  Process,
  Puzzles,
  ReArrange,
  RealatedServices,
  ScrollableItems,
  Services,
  Slider,
  SomeCaseStudies,
  Sponsors,
  TabsSection,
  TalentList,
  Team,
  Tiles,
  TitleAndDescription,
  TopCompanies,
  VerticalTabs,
  Videos,
  View,
  WeAreFamaash,
  WebformSection,
  WhyTheyChooseUs,
  MarketingMain,
  StatCardsWrapper,
  TextWithContent,
  MarketingCardsWrapper,
  BrandImages,
  LogosWrapper,
  ServiceStepsWrapper,
  StickyNav,
  CaseStudyCard,
  PPCSetupProcess,
  TableWrapper,
  EngineeringCardWrapper,
  Awards,
  ContentSection,
  ComparisonTable,
  TechStack,
  MatricsSlider,
  AchievementsWrapper,
  ProcessSteps,
  InsightSection,
  ClientTestimonial,
  Technologies,
} from '../../paragraphs';
import { RevenueChart } from '../../elements';

const variations = {
  revenue_chart: RevenueChart,
  business_needs: BusinessNeeds,
  creativity: Creativity,
  development_team: DevelopmentTeam,
  famaash_productions: FamaashProductions,
  famaash_streamlines: FamaashStreamlines,
  featured_case_studies: FeaturedCaseStudies,
  faq_s: Faq,
  get_in_touch_with_us: GetInTouchWithUs,
  grid: Grid,
  hero: Hero,
  hero_plus: HeroPlus,
  hero_slider: Hero,
  horizontal_tabs: HorizontalTabs,
  how_we_work: HowWeWork,
  our_capabilities: OurCapabilities,
  our_clients: Sponsors,
  our_expertise: OurExpertise,
  our_footprints: OurFootprints,
  our_model: OurModel,
  our_team: OurTeam,
  scrollable_items: ScrollableItems,
  services: Services,
  slider: Slider,
  tabs: TabsSection,
  tiles: Tiles,
  title_with_description: TitleAndDescription,
  vertical_tabs: RealatedServices,
  vertical_tabs_new: VerticalTabs,
  videos: Videos,
  view: View,
  webform: WebformSection,
  looking_for_a_team: Team,
  our_values: OurValues,
  people_tabs: PeopleTabs,
  about_us_cards: AboutUsCards,
  contact_ways: ContactWays,
  locations: Locations,
  all_servicestat_cardss: AllServices,
  talent_list: TalentList,
  some_cases_studies: SomeCaseStudies,
  horizontal_scroll: HorizontalScroll,
  puzzles: Puzzles,
  pricing: Pricing,
  re_arrange: ReArrange,
  process: Process,
  top_companies: TopCompanies,
  why_they_choose_us: WhyTheyChooseUs,
  we_are_famaash: WeAreFamaash,
  marketing_main: MarketingMain,
  stat_card_wrapper: StatCardsWrapper,
  text_with_content: TextWithContent,
  marketing_cards_wrapper: MarketingCardsWrapper,
  brands_images: BrandImages,
  service_steps_wrapper: ServiceStepsWrapper,
  logos_wrapper: LogosWrapper,
  sticky_nav:StickyNav,
  case_study_card:CaseStudyCard,
  ppc_setup_process:PPCSetupProcess,
  table_wrapper:TableWrapper,
  engineering_card_wrapper: EngineeringCardWrapper,
  awards: Awards,
  content_section: ContentSection,
  comparison_table: ComparisonTable,
  tech_stack: TechStack,
  matrics_slider: MatricsSlider,
  achievements_wrapper: AchievementsWrapper,
  process_steps: ProcessSteps,
  insight_section: InsightSection,
  client_testimonial: ClientTestimonial,
  technologies: Technologies,
};

const Paragraphs = ({ paragraphs, ...other }) => {
  return paragraphs?.items?.map(p => {
    const { type, id, title } = p;
    const { hostname } = window.location;
    const Component = variations[type];

    if (!Component) {
      return hostname === 'localhost' ? (
        <div className="pt-lg pb-lg text-white" key={id}>
          <div className="container">
            <div
              className="pb-md"
              dangerouslySetInnerHTML={{
                __html: `Paragraph of <b class="pl-3 pr-3">${type}</b> type is not found`,
              }}
            />
            {title?.value && <h2 className="text-light">{title.value}</h2>}
          </div>
        </div>
      ) : (
        console.warn(`=======\nParagraph of ${type} type is not found\n=======`)
      );
    }
    return (
      <ErrorBoundary key={id}>
          <Component data={p} Paragraphs={Paragraphs} {...other} />
        </ErrorBoundary>
    );
  });
};

export default Paragraphs;
