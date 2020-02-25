#ifndef KURSACH_DO_UTILS_H
#define KURSACH_DO_UTILS_H

#include <fstream>
#include <iostream>
#include <vector>
#include <sstream>

using namespace std;


//todo: add more utils functions

class Utils {

public:
    static vector<vector<int>> parse_matrix(string filename);

    static bool compare_matrices(vector<vector<int>> a, vector<vector<int>> b);

    static void print_matrix(vector<vector<int>> matrix);
};


#endif //KURSACH_DO_UTILS_H
