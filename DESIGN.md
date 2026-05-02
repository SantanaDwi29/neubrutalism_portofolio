---
name: Neubrutalist Portfolio
colors:
  surface: '#fff9ed'
  surface-dim: '#e0d9cc'
  surface-bright: '#fff9ed'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf3e5'
  surface-container: '#f4eddf'
  surface-container-high: '#eee8da'
  surface-container-highest: '#e8e2d4'
  on-surface: '#1e1c13'
  on-surface-variant: '#4b4736'
  inverse-surface: '#333027'
  inverse-on-surface: '#f7f0e2'
  outline: '#7d7763'
  outline-variant: '#cec6b0'
  surface-tint: '#6d5e00'
  primary: '#6d5e00'
  on-primary: '#ffffff'
  primary-container: '#ffe566'
  on-primary-container: '#766500'
  inverse-primary: '#dfc64b'
  secondary: '#ae2f34'
  on-secondary: '#ffffff'
  secondary-container: '#ff6b6b'
  on-secondary-container: '#6d0010'
  tertiary: '#00658b'
  on-tertiary: '#ffffff'
  tertiary-container: '#cae9ff'
  on-tertiary-container: '#006d95'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fce264'
  primary-fixed-dim: '#dfc64b'
  on-primary-fixed: '#211b00'
  on-primary-fixed-variant: '#524600'
  secondary-fixed: '#ffdad8'
  secondary-fixed-dim: '#ffb3b0'
  on-secondary-fixed: '#410006'
  on-secondary-fixed-variant: '#8c1520'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7dd0ff'
  on-tertiary-fixed: '#001e2d'
  on-tertiary-fixed-variant: '#004c6a'
  background: '#fff9ed'
  on-background: '#1e1c13'
  surface-variant: '#e8e2d4'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: IBM Plex Mono
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: IBM Plex Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
spacing:
  unit: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 32px
---

## Brand & Style
This design system centers on a raw, unapologetic aesthetic tailored for high-impact creative portfolios. It rejects the polished softness of modern corporate design in favor of high-contrast visuals, asymmetrical layouts, and honest materiality. The personality is bold, technical, and slightly disruptive, evoking the "DIY" spirit of early web and punk zine culture while maintaining modern usability standards.

## Colors
The palette utilizes a high-saturation trio of primary, secondary, and tertiary accents against a warm, off-white "Cream" background. Black is used strictly for structural elements—borders, shadows, and text—ensuring maximum legibility and a comic-book-like definition.

## Typography
Headings are rendered in Space Grotesk Bold, a font that captures the technical and geometric essence of the system. Body copy and labels use IBM Plex Mono to reinforce the "unrefined" and structural nature of the design. All headings should favor tight line-heights to emphasize their monolithic weight.

## Layout & Spacing
This design system utilizes a rigid 12-column fluid grid. Layouts should embrace intentional asymmetry—for example, a 7-column main card offset by a 4-column sidebar. Elements frequently break the grid container with "slight rotations" of 1 to 3 degrees (positive or negative) to create a dynamic, stacked-paper effect. Spacing is generous to prevent the heavy borders from feeling claustrophobic.

## Elevation & Depth
Depth is created through "Hard Shadows" rather than blurs or gradients. Every interactive surface and container uses a solid 4px black offset shadow (4px horizontal, 4px vertical, 0px blur). This creates a physical, "extruded" look. When an element is hovered or clicked, the shadow is removed, and the element translates 2px down and 2px to the right, simulating the physical compression of a button.

## Shapes
Shapes are defined by extreme angularity. Every corner must be a sharp 90-degree angle. This lack of border-radius reinforces the brutalist aesthetic. All containers, cards, buttons, and input fields must be enclosed in a 3px solid black border.

## Components
- **Buttons**: Thick 3px borders, filled with the Primary Yellow. On hover, the coral Secondary color is applied, the shadow is hidden, and the button translates (2px, 2px).
- **Cards**: Large containers with the off-white background. Cards should often be rotated -1 or +2 degrees. Titles within cards are always Space Grotesk Bold.
- **Inputs**: Solid black borders with IBM Plex Mono text. Focus states should swap the background from white to the Tertiary Blue.
- **Chips/Badges**: Small rectangles with 2px borders, used to categorize projects. Rotate these slightly and alternate between Primary, Secondary, and Tertiary fills.
- **Navigation**: Uses simple text links in IBM Plex Mono. On hover, an underline of 4px thickness in the Secondary Coral color appears behind the text.
- **Marquee**: A moving ticker strip (continuous scroll) with the Primary Yellow background and 3px top/bottom borders, used for site-wide announcements or skill lists.