import { gql } from "@apollo/client";

export const PAGE_SETTINGS_FRAGMENT = gql`
    fragment PageSettingsFragment on PageSettings {
        subheading
        title
        heroImage {
            node {
                altText
                sourceUrl
            }
        }
        features {
            description
            title
        }
        faq {
            question
            answer
        }
        pricingFeatures {
            type
            content
        }
        pricingPlans {
            groupName
            content
        }
    }
`;

export const TOOLS_FRAGMENT = gql`
    fragment ToolsFragment on Tools {
        toolsTitle
        toolsDescription
        subtitle
        items {
            classname
            description
            mediaClassname
            title
            image {
                node {
                    altText
                    sourceUrl
                }
            }
            icon {
                node {
                    altText
                    sourceUrl
                }
            }
            tabName
        }
        showTools
    }
`;

export const PAGE_BLOCKS_FRAGMENT = gql`
    fragment PageBlocksFragment on PageBlocks {
        showBlocksSection
        pageBlocksTitle
        pageBlocksDescription
        pageBlocksSubtitle
        pageBlocksItems {
            title
            description
            reverse
            image {
                node {
                    altText
                    sourceUrl
                }
            }
        }
    }
`;
