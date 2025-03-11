import { gql } from "@apollo/client";

export const PAGE_SETTINGS_FRAGMENT = gql`
    fragment PageSettingsFragment on PageSettings {
        subheading
        title
        heroImage {
            node {
                altText
                sourceUrl
                mediaDetails {
                    width
                    height
                }
            }
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
                    mediaDetails {
                        width
                        height
                    }
                }
            }
            icon {
                node {
                    altText
                    sourceUrl
                    mediaDetails {
                        width
                        height
                    }
                }
            }
            tabName
            link {
                url
            }
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
                    mediaDetails {
                        width
                        height
                    }
                }
            }
        }
    }
`;
