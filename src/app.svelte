<script type="tea">
    import {
        AppStyle,
        Baseline as baseline,
        Button,
        Icon,
        Paper,
        TextInput,
        TitleBar
    } from "svelte-doric"
    import { TronTheme as theme } from "svelte-doric/theme"
    import { Flex } from "svelte-doric/layout"

    mut source <+ ""

    fn nthRule {
        @n

        mut last <+ 0
        => fn {
            @letter

            last <+ (last + 1) % n
            guard last == 0 {
                => true
            }
            => false
        }
    }
    fn randomRule {
        guard Math.random() < 0.5 {
            => true
        }
        => false
    }
    fn funCaser {
        @rule

        => fn{letter} =>
            ?(rule(letter) == true)
            = letter.toUpperCase()
            : letter.toLowerCase()
    }
    fn funCase {
        @str
        @rule

        => str.replace(/\w/g, funCaser(rule))
    }

    fn copyText {
        @text

        navigator.clipboard.writeText(text)
        => void
    }

    $: texts <+ [
        funCase(source, nthRule(2))
        funCase(source, nthRule(3))
        funCase(source, randomRule)
    ]
</script>

<AppStyle {baseline} {theme} />

<Paper center width="min(720px, 100%)">
    <TitleBar sticky>
        Fun Casing
    </TitleBar>

    <Flex direction="column">
        <TextInput label="Regular Text" bind:value={source} />

        {#if source.trim() !== ""}
            {#each texts as text}
                <Button
                variant="outline"
                color="secondary"
                on:tap={() => copyText(text)}
                >
                    <Icon name="copy" />
                    {text}
                </Button>
            {/each}
        {/if}
    </Flex>
</Paper>
