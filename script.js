 window.addEventListener(
    "message",
    function (event) {
      if (event.data.marquee) {
        console.log(event.data);
        const elementId = event.data.repeater;
        function add(marqueefyElement) {
          const styleRef = marqueefyElement.children[0];
          if (styleRef?.children.length === 0) {
            const style = document.createElement("style");
            style.innerHTML = `#${marqueefyElement.id} {
                    --mq-bg: ${
                      window.getComputedStyle(styleRef).backgroundColor
                    } !important;
                    --mq-hover-bg:${
                      window.getComputedStyle(styleRef).backgroundColor
                    } !important;
                    --mq-color: ${
                      window.getComputedStyle(styleRef).backgroundColor
                    } !important;
                    --mq-hover-color: ${
                      window.getComputedStyle(styleRef).backgroundColor
                    } !important;
                    --mq-border-width: ${
                      window.getComputedStyle(styleRef).borderWidth
                    } !important;
                    --mq-border-style: ${
                      window.getComputedStyle(styleRef).borderStyle
                    } !important;
                    --mq-border-color: ${
                      window.getComputedStyle(styleRef).borderColor
                    } !important;
                    --mq-border-radius: ${
                      window.getComputedStyle(styleRef).borderRadius
                    } !important;
                    --mq-padding-y: ${
                        marqueefyElement.children[1].getBoundingClientRect()
                            .y - marqueefyElement.children[0].getBoundingClientRect().y
                    }px !important;
                    --mq-padding-x: ${
                        marqueefyElement.children[1].getBoundingClientRect()
                            .x - marqueefyElement.children[0].getBoundingClientRect().x}px !important;
                    --mq-font-size: ${
                      window.getComputedStyle(styleRef).fontSize
                    } !important;
                    --mq-font-family: ${
                      window.getComputedStyle(styleRef).fontFamily
                    } !important;
                    /* --mq-animation-duration: 15s; */
                    --mq-item-gap: 0px;
            }`;

            document.head.appendChild(style);
            styleRef.remove();
          }
            marqueefyElement.setAttribute("class", "marqueefy");
            
          marqueefyElement.children[0].classList.add("content");
          if (event.data.direction) {
            marqueefyElement.setAttribute(
              "data-mq-direction",
              event.data.direction
            );
          }
          if (event.data.speed) {
            marqueefyElement.setAttribute("data-mq-speed", event.data.speed);
          }
          const marqueefyElementInstance = new marqueefy.Marqueefy(
            marqueefyElement
          );
        }
        const setup = setInterval(() => {
          const marqueefyElement = document.getElementById(elementId);
          if (marqueefyElement.parentElement) {
            clearInterval(setup);
            add(marqueefyElement.parentElement);
          }
        });
        const checker = setInterval(() => {
          const marqueefyElement = document.getElementById(elementId);
          if (
            marqueefyElement.parentElement &&
            !marqueefyElement.parentElement.classList.contains("marqueefy")
          ) {
            add(marqueefyElement.parentElement);
          }
        }, 1000);
      }
    },
    false
  );
