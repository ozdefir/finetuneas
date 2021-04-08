# finetuneas 3.0

**finetuneas** is a simple HTML interface for fine tuning sync maps output by [aeneas](https://github.com/readbeyond/aeneas)

![alt text](https://github.com/klintan/finetuneas/raw/master/screenshot.png "Finetuneas screenshot")

# Version 3.0
1. Easier adjusting time: following cells will be adjusted according to the previous changes
2. Work right-to-left languages
3. One can type the time - easier
4. the output will be saved as a CSV file too
5. Last but not the least looks more stylish

## Usage

1. Before you start making adjustments, check several fragments at random to be sure that the sync map is mostly correct and it just needs fine tuning. If not, check your `aeneas` input files and parameters and run `aeneas` again.
2. To check the begin time of each fragment, click on the corresponding text or timestamp. If necessary, use the `+` and `−` buttons to adjust it.
3. When done, you can save the adjusted sync map to file. If the desired format is not available, choose JSON and then use the `aeneas.tools.convert_syncmap` tool to convert it.

## License

The MIT License (see the [`LICENSE`](LICENSE) file for details)

