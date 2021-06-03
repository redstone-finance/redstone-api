<h1>Redstone - data ecosystem for Decentralised Finance</h1>

<h3>The Problem</h3>

<p>
Financial data is the backbone of decentralised finance.
It enables assets valuation and collateral management.
Without access to the reliable pricing feeds, it's impossible to create instruments like derivatives, options and futures.
</p>

<p>
The awareness of the importance of data quality raised with the growth of decentralised finance.
This sector (aka DeFi) is experiencing an exponential growth surpassing 5bn valuation
and attracting professional investors and thousands of retail users.
At the beginning, different protocols used their own, in-house price feeds.
The naive approach to getting financial data lead to many multiple security incidents
resulting in millions of dollars being lost and posing an existential threat to the further growth of the sector.
Let's just mention the few costly incidents from the last year:
  
</p>

<p>
The hard-learned lesson about the data quality importance led to the explosive growth of data-providing services.
The Chainlink, being the market leader, experienced a massive growth reaching a valuation that exceed the whole defi space.
This led many experts to the conclusion, that <b>the whole decentralised finance is as valuable as the data that powers it</b>.
</p>

There are however a few problems with how the financial data is being collected right now.
The most important is the extreme cost of storing pricing data on-chain.
The Chainlink pays daily about ~$100k to cover the Ethereum storage fees.
This model is currently heavily subsidised and is not sustainable in the future
when we are expecting more and more financial instruments to enter the market.
</p>

<h3>The Solution</h3>

<p>
Redstone uses Arweave as a base blockchain.   
Arweave with its affordable permanent storage blockchain appears to be a perfect remedy for the pains of the DeFi sector.
Moreover, the Smartweave contracts may help to maintain data integrity managing the reputation of data providers.
Arweave offers also a neat monetisation model with the Profit Sharing Token rewarding providers for high-quality data.
</p>

<h3>Architecute</h3>

<h4>Data miners</h4>
Data miners are agents (system deamons) that periodically upload data to the network. The content of the uploaded dataset is specified by the data order that contains:

* Asset name
* Period
* Probing interval
* Data source 

The orders are also stored on the Arweave chain and periodically queried by the miners. 

Data miners could be started by executing the following scipt from the main directory:

`
node ./backend/provider/data-miners/mine-data.js
`


<h4>Data processors</h4>
Data processors can transform one data set into another. It allows producing meaningful metrics and insights based on a combination of base pricing and traffic data.

<h5>Balancer rewards</h5>
An example of data processor is the code calculating rewards for providing liquidity to the Balancer protocol. 

The sample processor could be started by executing the following scipt from the main directory:

`
node ./backend/provider/data-miners/mine-balancer-rewards.js
`

<h2 id="licensing">Licensing</h2>

<ul>
  <li>
    <p>Copyright © 2020 Jakub Wojciechowski</p>
  </li>
  <li>
    <p>Licensed under MIT</p>
  </li>
</ul>
