---
title: I Bought the Stack Overflow Keyboard. I Instantly Became a 10x Developer and Ended Up Writing the Default Firmware for It
desc:
author: Jason Wihardja
github: jason-wihardja
telegram: jason_wihardja
date: 2022-07-24
cover: https://diskusi-tech-production.s3.amazonaws.com/i/tbg77rlcm2luwyxvpg4k.png
categories:
    - QMK programming
    - Stack Overflow
---

## "The Key"

The date was April 1st. It was April Fools day. People are playing their best practical jokes and pranks on others. And that also includes the people at Stack Overflow. They created something called [The Key](https://stackoverflow.blog/2021/03/31/the-key-copy-paste), a device that was claimed to be built from the ground up to make copy-pasting code from Stack Overflow fast, painless, and fun.

![](https://149351115.v2.pressablecdn.com/wp-content/uploads/2021/09/the-key-pank-1-827x630.png)

This April Fools joke-turned product then went on to became a huge hit. It was sold out within minutes and earned a nearly 5-star average review score. This was a keyboard whose sound was said to be optimized for improved productivity and mood, akin to the natural wonder of song bird chirps (their words, not mine) where everything just clicks. It was simple, elegant, and also functional at the same time.

I missed the chance to buy one last year due to its very limited quantity. This year, however, they came up with something even better.

![](https://149351115.v2.pressablecdn.com/wp-content/uploads/2022/04/Key-V2-Promo-shot-945x630.jpeg)

The new [The Key V2](https://stackoverflow.blog/2022/05/04/unlock-your-full-programming-potential-with-the-key-v2-0/) comes with a few notable changes. The case is now made from acrylic, it has built-in RGB LEDs and also made the switch hot-swappable. What's not to like? Only 4,900 units were made, so I had to act fast. And that's how the story began.

## Expectation vs Reality

A few weeks went by and on one day, it finally arrived. Words cannot describe how excited I was. I couldn't wait to unlock my full programming potential, or so I thought. But boy, I was wrong.

As soon as I plugged it in to my computer for the first time, the RGB only flashed red and it was fairly basic, to say the least. There was no way to remap the keys via some software, no way to customize RGB lighting, nor was there a guide on how to do those two.

I knew for a fact that this device is QMK programmable, so there had to be a way to do that, right? A quick search throughout the documentation page leads me into [this page](https://drop.com/talk/93641/how-to-configure-stack-overflow-the-key-macropad). But as you might have noticed, it was clearly written for the V1 hardware, not for the V2.

I followed the steps in the documentation and while it enabled me to remap the keys, it also came with a major deal breaker. It completely killed the RGB lights as the V1 hardware didn't come with any. This was confirmed by some people in the discussion forum who also reported that after following the tutorial, their device's RGB lights are either now completely turned off, only partially turned on, or turned on until they unplugged it and afterwards it wouldn't turn back on anymore.

Adding more problems into the situation, the website used for building the firmware also has a text on the bottom saying _"kbfirmware.com is end-of-life. It is strongly encouraged to migrate any projects to more updated solutions"_.

Oh, come on, Stack Overflow. It shouldn't be this onerous. To put it simply, this was the total opposite of what they had put in the marketing materials. It was no fun, painful, and also, no bird chirping sounds at all.

A quick search around the QMK's firmware [Github page](https://github.com/qmk/qmk_firmware) (which supposedly hosts a list of default firmwares for various keyboards) also made no mention of this device.

I was about to return it, but then I realized, this is not what 10x developers do. They don't quit that easily. Real 10x developers are problem solvers. They create an impact for others. And this realization had given me new determination. I had to create the default firmware for it and help everyone who had gotten their hands on the 4,900 units available to become more productive.

## Defining the Default

As Winston Churchill famously said, “He who fails to plan is planning to fail”, so I started planning. What do people want as default? What features need to be there? What degree of customization that people expect this device to have so that they can start exploring the device's unique capability without having to learn much about its technical details before?

So, I started by reading all the reviews, Q&As and discussion page for the device. And after spending several hours reading through them all, I found that there seems to be 3 main categories of people. Each one of the categories had different needs:

1. The people who wanted the OOBE setup back after messing up their own customization and can't get it due to the "official" firmware builder killing the LEDs. Some of them were also willing to learn and looked at the source code for that OOBE firmware.
2. The people who wanted to make the Stack Overflow button actually typed out `https://stackoverflow.com/` and the C button to be CTRL/CMD+C and the V button to be CTRL/CMD+V.
3. The people who wanted to take full control of the LEDs and explore all customization options for it.

With those insights in mind, I then knew that I had to create 3 different defaults to satisfy all those most commonly requested needs.

But first, I need to start supporting the keyboard in QMK. I started by forking the official [QMK Firmware Github repository](https://github.com/qmk/qmk_firmware), and then created a new folder under the `massdrop/thekey_v2` directory.

Next, I mapped out the 3 buttons in the JSON and the keyboard definition file. The keyboard only has 3 keys, so it shouldn't be difficult.

```json
{
    "keyboard_name": "The Key V2",
    "url": "https://drop.com/buy/stack-overflow-the-key-v2-macropad",
    "maintainer": "massdrop",
    "layouts": {
        "LAYOUT": {
            "layout": [
                { "label": "K00 (D4,D2)", "x": 0, "y": 0 },
                { "label": "K01 (D4,D1)", "x": 1, "y": 0 },
                { "label": "K02 (D4,D0)", "x": 2, "y": 0 }
            ]
        }
    }
}
```

<center>*info.json*</center>

```cpp
#pragma once

#include "quantum.h"

#define XXX KC_NO

#define LAYOUT( \
    K00, K01, K02  \
) { \
    { K00, K01, K02 }, \
}
```

<center>*thekey_v2.h*</center>

Next, I started to create the configuration for this keyboard. After some debugging, I also found out that the LED light arrangements are rather unique. It doesn't follow the normal orders, but the way those are arranged from left to right is `4, 0, 1, 2, 3`. I also had to enable lighting layers so I can use the RGB lights to indicate which keymap layer the user is currently on.

```cpp
#pragma once

#include "config_common.h"

/* USB Device descriptor parameter */
#define VENDOR_ID       0xFEED
#define PRODUCT_ID      0x0000
#define DEVICE_VER      0x0002
#define MANUFACTURER    Drop
#define PRODUCT         The Key V2

/* key matrix size */
#define MATRIX_ROWS 1
#define MATRIX_COLS 3

/*
 * Keyboard Matrix Assignments
 */
#define MATRIX_ROW_PINS { D4 }
#define MATRIX_COL_PINS { D2, D1, D0 }

#define DIODE_DIRECTION ROW2COL

#define RGB_DI_PIN B1
#define RGBLED_NUM 5
#define RGBLIGHT_LED_MAP {4, 0, 1, 2, 3} /* RGB light arrangement */
#define RGBLIGHT_ANIMATIONS
#define RGBLIGHT_HUE_STEP 10
#define RGBLIGHT_SAT_STEP 10
#define RGBLIGHT_VAL_STEP 15
#define RGBLIGHT_LIMIT_VAL 255 /* The maximum brightness level */
#define RGBLIGHT_SLEEP /* If defined, the RGB lighting will be switched off when the host goes to sleep */
#define RGBLIGHT_LAYERS /* Enable lighting layers */
#define RGBLIGHT_LAYER_BLINK /* Enable lighting layer blink */
```

<center>*config.h*</center>

With the initial config of the keyboard being done, I can now proceed with the keymaps.

I started with the first group of people. Providing an OOBE keymap was a fairly straightforward process as it only involves 3 key bindings.

```cpp
#include QMK_KEYBOARD_H

const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {

    [0] = LAYOUT(KC_LCTL, KC_C, KC_V),

};
```

<center>*default/keymap.c*</center>

Now moving on with the second group of people. This can be done through [custom keycodes](https://docs.qmk.fm/#/custom_quantum_functions?id=custom-keycodes). I had to make the Stack Overflow button to act as a button whose behavior I need to handle manually.

```cpp
#include QMK_KEYBOARD_H

enum custom_keycodes {
    TK_URL = SAFE_RANGE,
};

const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
    [0] = LAYOUT(TK_URL, C(KC_C), C(KC_V)),
};


bool process_record_user(uint16_t keycode, keyrecord_t *record) {
    switch (keycode) {
        case TK_URL:
            if (record->event.pressed) {
                // when keycode TK_URL is pressed
                SEND_STRING("https://stackoverflow.com/");
            }
            break;
        default:
            break;
    }
    return true;
}
```

<center>*url-copy-paste/keymap.c*</center>

Now let's move on to the final group of people. This one is a little bit more challenging since I had only 3 buttons to work with and a full RGB control obviously needs more than that. So, I utilized the feature called [layers](https://docs.qmk.fm/#/keymap?id=keymap-and-layers). Using layers, I can now effectively have "extra buttons" to use. I knew that I had to designate the Stack Overflow button as a layer move button, so I had 2 buttons that I can work with in each layer.

In addition to that, I also knew that I had to give visual feedback to the user so they wouldn't be confused on which layer they're currently on. I had 5 LEDs to play with, so I implemented a 5-layer keymaps:

1.  Layer 0 (leftmost LED flashes white):
    -   Move to layer 1
    -   CTRL + C
    -   CTRL + V
1.  Layer 1 (LED under the Stack Overflow button flashes white):
    -   Move to layer 2
    -   Turn on/off LED
    -   Change RGB animation mode
1.  Layer 2 (LED under the C button flashes white):
    -   Move to layer 3
    -   LED brightness up
    -   LED brightness down
1.  Layer 3 (LED under the V button flashes white):
    -   Move to layer 4
    -   LED hue up
    -   LED hue down
1.  Layer 4 (rightmost LED flashes white):
    -   Move to layer 0
    -   LED saturation up
    -   LED saturation down

With that in mind, I started coding the implementation. I used a feature called [lighting layers](https://docs.qmk.fm/#/feature_rgblight?id=lighting-layers).

```cpp
#include QMK_KEYBOARD_H

enum custom_keycodes {
    LAYER_SWITCH = SAFE_RANGE,
};

const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {

    /* Default */
    [0] = LAYOUT(LAYER_SWITCH, C(KC_C), C(KC_V)),

    /* RGB Toggle + Mode Change */
    [1] = LAYOUT(LAYER_SWITCH, RGB_TOG, RGB_MOD),

    /* RGB Brightness */
    [2] = LAYOUT(LAYER_SWITCH, RGB_VAD, RGB_VAI),

    /* RGB Hue */
    [3] = LAYOUT(LAYER_SWITCH, RGB_HUD, RGB_HUI),

    /* RGB Saturation */
    [4] = LAYOUT(LAYER_SWITCH, RGB_SAD, RGB_SAI),

};

/* Lighting layers */

const rgblight_segment_t PROGMEM layer_indicator_0[] = RGBLIGHT_LAYER_SEGMENTS(
    {0, 1, HSV_WHITE},
    {1, 4, HSV_OFF}
);

const rgblight_segment_t PROGMEM layer_indicator_1[] = RGBLIGHT_LAYER_SEGMENTS(
    {0, 1, HSV_OFF},
    {1, 1, HSV_WHITE},
    {2, 3, HSV_OFF}
);

const rgblight_segment_t PROGMEM layer_indicator_2[] = RGBLIGHT_LAYER_SEGMENTS(
    {0, 2, HSV_OFF},
    {2, 1, HSV_WHITE},
    {3, 2, HSV_OFF}
);

const rgblight_segment_t PROGMEM layer_indicator_3[] = RGBLIGHT_LAYER_SEGMENTS(
    {0, 3, HSV_OFF},
    {3, 1, HSV_WHITE},
    {4, 1, HSV_OFF}
);

const rgblight_segment_t PROGMEM layer_indicator_4[] = RGBLIGHT_LAYER_SEGMENTS(
    {0, 4, HSV_OFF},
    {4, 1, HSV_WHITE}
);

const rgblight_segment_t* const PROGMEM rgb_layers[] = RGBLIGHT_LAYERS_LIST(
    layer_indicator_0,
    layer_indicator_1,
    layer_indicator_2,
    layer_indicator_3,
    layer_indicator_4
);

void keyboard_post_init_user(void) {
    /* Enable the LED layers */
    rgblight_layers = rgb_layers;
}

/* Layer handler */

uint16_t layer = 0;

bool process_record_user(uint16_t keycode, keyrecord_t *record) {
    switch (keycode) {
        case LAYER_SWITCH:
            if (record->event.pressed) {
                if (layer > 0) {
                    layer_off(layer);
                }

                rgblight_unblink_layer(layer);
                layer = (layer + 1) % 5;
                rgblight_blink_layer_repeat(layer, 1000, 1);

                if (layer > 0) {
                    layer_on(layer);
                }
            }
            return false;
        default:
            return true;
    }
}

```

<center>*rgb-control/keymap.c*</center>

After I was done with the 3 implementations, I tested them on my device, discovered no deal-breaking bugs and made a [pull request](https://github.com/qmk/qmk_firmware/pull/17696) to QMK's firmware repository.

A few days went by, and I had the pull request merged without any issue and change request by the maintainers. And that was the story of how I created the default firmware for this device. My code can now be seen being hosted [here](https://github.com/qmk/qmk_firmware/tree/master/keyboards/massdrop/thekey_v2).

## Conclusion

At the beginning, I was pretty disappointed with what this device came up with out of the box. But learning QMK programming proves to be worth learning. The possibilities that you can get out of it are pretty much endless once you understand QMK programming.

And what I covered here was just half of the story. After getting the default firmware approved by QMK maintainers, I actually had managed to build another firmware that suits my own needs and I paired it with AutoHotkey installed in my Windows machine. This device can now do even more things.

Here are some examples of apps that I had built a custom button mapping for:

1. Spotify: `Previous Song, Play/Pause, Next Song`
1. Visual Studio Code: `Start Debugging, Step Over, Step Into`
1. Microsoft Edge: `New Tab, Previous Tab, Next Tab`
1. Zoom: `Raise Hand, Mute/Unmute Mic, Start/Stop Camera`
1. And many more...

I now understand what they meant by fast, painless, and fun. I can now do many tasks much faster, not having to remember all the keyboard shortcuts for commonly used tasks is painless, and lastly, it was indeed fun coding for it, let alone coding something that would later become the default firmware for this device.

I hope you enjoy reading this story, and you can learn something. Thank you for reading until the end of this article, and as always, enjoy the rest of your day.
