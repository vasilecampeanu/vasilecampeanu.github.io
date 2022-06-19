---
title: "Markdown Syntax"
description: "This article offers a sample of basic markdown syntax that can be used in Hugo content files, also it shows whether basic HTML elements are decorated with CSS in a Hugo theme."
tags: [ "markdown", "html" ]
categories: [ "hugo" ]
date: 2022-03-18T21:10:00+07:00
---

# So, what is markdown?
Markdown is a lightweight markup language for creating formatted text using a plain-text editor. John Gruber and Aaron Swartz created Markdown in 2004 as a markup language that is appealing to human readers in its source code form.

# Codeblocks
```CPP
#include <iostream>

/**
 * This is a multiline comment.
 **/
int main(int argc, char** argc)
{
    std::cout << "Hello world!" << std::endl; // This is a comment
    return 0;
}
```

# Latex support
KaTeX shortcode let you render math typesetting in markdown document. See [KaTeX](https://katex.org).

```latex
{{</* katex [display] [class="text-center"]  */>}}
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
{{</* /katex */>}}
```

{{< katex display >}}
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
{{< /katex >}}

# Shortcodes

Shortcode definition.
```latex
{{</* callout name */>}}
...
{{</* /callout */>}}
```

## Callouts
{{< callout info >}}
**Info callout**  
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tristique nibh at placerat commodo. Nam non porttitor quam, nec imperdiet odio. Donec tincidunt sit amet sapien eget maximus. Donec congue hendrerit lacus non vestibulum. Aliquam erat volutpat. Nullam sit amet urna non lorem blandit iaculis non pretium tellus. Phasellus consectetur eu leo eget suscipit.
{{< /callout >}}

{{< callout warning >}}
**Warning callout**  
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tristique nibh at placerat commodo. Nam non porttitor quam, nec imperdiet odio. Donec tincidunt sit amet sapien eget maximus. Donec congue hendrerit lacus non vestibulum. Aliquam erat volutpat. Nullam sit amet urna non lorem blandit iaculis non pretium tellus. Phasellus consectetur eu leo eget suscipit.
{{< /callout >}}

{{< callout danger >}}
**Danger callout**  
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tristique nibh at placerat commodo. Nam non porttitor quam, nec imperdiet odio. Donec tincidunt sit amet sapien eget maximus. Donec congue hendrerit lacus non vestibulum. Aliquam erat volutpat. Nullam sit amet urna non lorem blandit iaculis non pretium tellus. Phasellus consectetur eu leo eget suscipit.
{{< /callout >}}