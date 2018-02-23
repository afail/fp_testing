import {Selector} from 'testcafe';
import {ClientFunction} from 'testcafe';

const getLocation = ClientFunction(() => document.location.href);

let nfl_preseason = false;
fixture('FP Mainsite NFL')
    .page('https://www.fantasypros.com/nfl/index.php');

test('Homepage', async t => {
    await t
        .expect(Selector('#nav-top > nav > div.top-link.sport-link.top-sport-nfl.mega-dropdown-wrap > a').innerText).eql('NFL', 'NFL Link missing in navbar')
        .expect(Selector('.ad-320+ nav .heading a').textContent).eql('Research', 'Unexpected First Header');
    if (nfl_preseason) {
        await t
            .expect(Selector('.promo-text .visible-desktop').exists).ok('Promo Text Missing')
    }
});

test('Search', async t => {
    await t
        .click(Selector('.fa-search'))
        .expect(getLocation()).contains('/nfl/players/')
        .typeText('#index-search', 'Tom Brady')
        .click('#index-search-submit')
        .expect(getLocation()).contains('tom-brady')
});

test('Draft Simulator', async t => {
    await t
        .click(Selector('.fa-dw-draft-simulator+ .item-title'))
        .expect(getLocation()).contains('/football/mock-draft-simulator/')
        .expect(Selector('h1').innerText).eql('Fantasy Football Draft Simulator')
        .expect(Selector('.section-wrap:nth-child(1)').innerText).contains('Upgrade now')
        .expect(Selector('.video-player').exists).ok()
});

test('Who should I draft?', async t => {
    await t
        .setNativeDialogHandler(() => true) //Allow interaction with alerts
        .click(Selector('.fa-fp-start-sit-assistant+ .item-title'))
        .expect(getLocation()).contains('/nfl/draft/')
        .expect(Selector('h1').innerText).eql('Who Should I Draft?')
        .click(Selector("#submit-fast-search")); //Click View Advice without any players selected

    const history = await t.getNativeDialogHistory();
    await t
        .expect(history[0].text).eql('Please select two players to compare') //Did the dialog box popup?
        .click(Selector('.player-link').nth(1))
        .click(Selector('.player-link').nth(5))
        .click(Selector("#submit-fast-search"))
        .expect(Selector(".experts-pick div").innerText).contains("Experts")
        .expect(Selector(".more").innerText).contains('%')
        .expect(Selector(".same").innerText).contains('%')
});
